
"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { AddProductCard } from "./AddProductCard";

export type Image = {
	file?: File | null;
	preview?: string | null;
	width?: number;
	height?: number;
}

export type ProductForm = {
	title: string;
	productImage: { file?: File | null; preview?: string | null; caption?: string }[];
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

export type Guide = {
	water: Array<number>;
	rice: Array<number>;
	finger: Array<number>;
	step: Array<number>;
}

export function AddProductPage(){
	const [form, setForm] = useState<ProductForm>({
		title: "",
		productImage: [{ file: null, preview: null, width: undefined, height: undefined }] as Image[],
		description: "",
		price: 0,
		detail: "",
		properties: [],
		guide: { water: [0,0,0,0], rice: [0,0,0,0], finger: [0,0,0,0], step: [1,2,3,4] },
		package: "",
		parts: "",
		ingredients: "",
		grow: "",
		cooking: "",
		wrap_process: "",
		certificate: "",
		international: false,
	});
	// Hàm cập nhật từng trường
	const handleChange = (key: keyof ProductForm , value: any) => {
		setForm((prev) => ({ ...prev, [key]: value }));
		console.log("Updated form:", { ...form, [key]: value });
	};

	// Hàm cập nhật mảng thuộc tính
	const handlePropertiesChange = (key: keyof Guide, index:number, value: number) => {
		setForm((prev) => {
			const newProperties = [...prev.guide[key]];
			newProperties[index] = value;
			return { ...prev, guide: { ...prev.guide, [key]: newProperties } };
		});
	};

	// Hàm cập nhật mảng hình ảnh
	const setImageFile = (
		indexImage: number | null,
		fileOrUndefined?: File | null
	) => {
			const index = indexImage as number;
			const file = fileOrUndefined as File | null;
			const images = [...form.productImage];
			if (images[index]?.preview) URL.revokeObjectURL(images[index].preview!);
			const preview = file ? URL.createObjectURL(file) : null;
			images[index] = { ...images[index], file, preview };
			handleChange("productImage", images);
	};
	return(
	  <div>
		<div className="mx-auto max-w-5xl px-4 py-6">
		  <h1 className="text-xl font-semibold">Thêm sản phẩm</h1>
		</div>
		<AddProductCard
		  type="text"
		  field="title"
		  title="Tên sản phẩm"
		  onUpdateField={(field, value) => handleChange(field, value)}
		  onSetImageFile={() => {}}
		  handlePropertiesChange={() => {}}
		/>
		<div className="w-full mt-5 space-y-4 flex flex-row overflow-x-auto">
		  {form.productImage.map((img, idx) => (
			<AddProductCard
			  key={idx}
			  type="image"
			  field={img}
			  index={idx}
			  onUpdateField={() => {}}
			  onSetImageFile={(indexImage, fileOrUndefined) => setImageFile(indexImage, fileOrUndefined)}
			  handlePropertiesChange={() => {}}
			/>
		  ))}
		</div>
		<button
			type="button"
			className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
			onClick={() => handleChange('productImage', [...form.productImage, { file: null, preview: null, width: undefined, height: undefined }])}
		  >
			<span>+ Thêm ảnh sản phẩm</span>
		  </button>
		<div className="flex flex-row">

			<div className="mx-auto max-w-5xl px-4 py-6 flex flex-col gap-4">
			{form.guide.water.map((_, index) => (
				<div className="flex flex-row gap-2" key={index}> 
					<span className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">{`Bước ${form.guide.step[index]}`}</span>
					<AddProductCard
						key={index}
						type="array"
						field="water"
						index={index}
						onUpdateField={() => {}}
						onSetImageFile={() => {}}
						handlePropertiesChange={handlePropertiesChange}
					/>
				</div>
			))}
			</div>
			<div className="mx-auto max-w-5xl px-4 py-6 flex flex-col gap-4">
			{form.guide.rice.map((_, index) => (
				<AddProductCard
					key={index}
					type="array"
					field="rice"
					index={index}
					onUpdateField={() => {}}
					onSetImageFile={() => {}}
					handlePropertiesChange={handlePropertiesChange}
				/>
			))}
			</div>
			<div className="mx-auto max-w-5xl px-4 py-6 flex flex-col gap-4">
			{form.guide.finger.map((_, index) => (
				<AddProductCard
					key={index}
					type="array"
					field="finger"
					index={index}
					onUpdateField={() => {}}
					onSetImageFile={() => {}}
					handlePropertiesChange={handlePropertiesChange}
				/>
			))}
			</div>
		</div>
	  </div>
	)
}