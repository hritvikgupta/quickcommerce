// app/api/cart/route.js
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const cartDataFilePath = "/data/cartData.json"

export async function GET() {
  try {
    const data = fs.readFileSync(cartDataFilePath, 'utf8');
    const cartData = JSON.parse(data);
    return NextResponse.json(cartData);
  } catch (error) {
    console.error('Error reading cart data:', error);
    return NextResponse.json({ error: 'Error reading cart data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const cartData = await request.json();
    fs.writeFileSync(cartDataFilePath, JSON.stringify(cartData, null, 2), 'utf8');
    return NextResponse.json({ message: 'Cart data saved successfully' });
  } catch (error) {
    console.error('Error writing cart data:', error);
    return NextResponse.json({ error: 'Error writing cart data' }, { status: 500 });
  }
}
