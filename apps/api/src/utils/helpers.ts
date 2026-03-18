import { Request, Response } from 'express';

export function getCookie(req: Request, name: string): string | null {
  const value = (req.cookies as Record<string, string>)?.[name];
  return typeof value === 'string' ? value : null;
}

export function setTokens(
  res: Response,
  { accessToken, refreshToken }: { accessToken: string; refreshToken: string },
) {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    partitioned: true,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    partitioned: true,
  });
}

export function deleteTokens(res: Response) {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    partitioned: true,
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    partitioned: true,
  });
}
