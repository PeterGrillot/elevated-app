import { NextResponse } from 'next/server';
import { UserType } from '@/types';

const BASE_URL = 'https://interviews-accounts.elevateapp.com/api/ui/'

export async function GET() {
    // NOTE: Should be handle by real auth, for demo purpose only
    const authentication_user_id = process.env.AUTH_USER_ID;
    const authentication_token = process.env.AUTH_TOKEN;
    const CREDS = `?authentication_user_id=${authentication_user_id}&authentication_token=${authentication_token}`;


    if (!authentication_user_id || !authentication_token) {
        return NextResponse.json({ message: 'Invalid Credentials', status: 400 });
    }
    try {
        const idsResponse = await fetch(`${BASE_URL}/users${CREDS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!idsResponse.ok) {
            return NextResponse.json({ message: 'Failed to fetch users' }, { status: idsResponse.status });
        }

        const { user_ids } = await idsResponse.json();
        if (!Array.isArray(user_ids)) {
            return NextResponse.json({ error: 'Invalid user IDs response' }, { status: 500 });
        }

        const userDetailsPromises = user_ids.map(async (id) => {
            const userResponse = await fetch(`${BASE_URL}/users/${id}${CREDS}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            return userResponse.ok ? userResponse.json() : null;
        });

        const users = await Promise.all(userDetailsPromises);

        return NextResponse.json(users.filter(user => user !== null));
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
