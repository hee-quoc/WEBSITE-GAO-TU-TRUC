
"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";

type ProductForm = {
    title: string;
    productImage: { file?: File | null; preview?: string | null; caption?: string };
    subProductImages: { file?: File | null; preview?: string | null; caption?: string }[];
    description: string;
    price: number;
	detail:  string;
	properties: Array<number>;
	guide: Guide;
	package: string;
	parts: string;
	ingredients: string;
	grow: string;
	cooking: string;
	wrap_process: string;
	certificate: string;
	international: boolean;
}

type Guide = {
    water: Array<number>;
    rice: Array<string>;
	finger: Array<string>;
	step: Array<string>;
}

export function AddProductPage(){
    
    return(
        <div>

        </div>
    )
}