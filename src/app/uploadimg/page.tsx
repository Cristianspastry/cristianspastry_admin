

"use client"
import React from 'react'
import AddImageForm from '@/components/form/addImageForm/addImageForm';

type Props = {}
export default function UploadImg({ }: Props) {

    return (
        <div className="flex items-center justify-center min-h-screen">
            <AddImageForm/>
        </div>
    );
}
