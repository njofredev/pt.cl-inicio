import { NextRequest, NextResponse } from 'next/server';
import { signAdminToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { success: false, message: 'ADMIN_PASSWORD no está configurada en el servidor.' },
        { status: 500 }
      );
    }

    if (!password || password !== correctPassword) {
      return NextResponse.json({ success: false, message: 'Contraseña incorrecta' }, { status: 401 });
    }

    const token = signAdminToken();
    const response = NextResponse.json({ success: true, message: 'Sesión iniciada' });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Sesión cerrada' });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
