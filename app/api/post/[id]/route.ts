import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/primsa';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
        const id =req.url?.split('/').pop();
        console.log(id)
        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: id as string // Assuming postId is a string
                },
                include: { author: { select: { name: true } } } // Include author info
            });

            if (!post) {
                return NextResponse.json({ message: 'Post not found' });
            }

            return NextResponse.json(post);
        } catch (error) {
            console.error('Error fetching post:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
}
