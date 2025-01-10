"use client"

import React, {use} from 'react';
import {Document} from "@/components/document";

const DocumentPage = (props: { params: Promise<{ id: string }> }) => {
    const params = use(props.params);

    const {
        id
    } = params;

    return (
        <div className={"flex flex-col flex-1 min-h-screen "}>
            <Document id={id}/>
        </div>
    );
};

export default DocumentPage;