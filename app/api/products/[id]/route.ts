import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Get a single product
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

// PUT: Update a product
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await req.json();
  const updatedProduct = await prisma.product.update({ where: { id }, data });
  return NextResponse.json(updatedProduct);
}

// DELETE: Delete a product
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ message: 'Product deleted successfully' });
}
