import { NextResponse } from 'next/server';

const BASE_URL = 'https://interviews-accounts.elevateapp.com/api/ui/'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params // 'a', 'b', or 'c'
    // NOTE: Should be handle by real auth, for demo purpose only
    const authentication_user_id = process.env.AUTH_USER_ID;
    const authentication_token = process.env.AUTH_TOKEN;
    const CREDS = `?authentication_user_id=${authentication_user_id}&authentication_token=${authentication_token}`;


    if (!authentication_user_id || !authentication_token) {
        return NextResponse.json({ message: 'Invalid Credentials', status: 400 });
    }
    try {
        const userResponse = await fetch(`${BASE_URL}/users/${id}${CREDS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!userResponse.ok) {
            return NextResponse.json({ message: 'Failed to fetch users' }, { status: userResponse.status });
        }
        const data = await userResponse.json()
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
