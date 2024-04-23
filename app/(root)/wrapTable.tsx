"use client"
import {columns1, columns2, columns3, columns4, columns5, columns7} from "../../components/columns"
import { DataTable } from "@/components/ui/data-table"
import {ArrowBigUpDash} from "lucide-react";
import { useState, useEffect } from 'react'
import { AdRateType} from "@/types/AdRate"

export default function WrapTable() {
    const [data1, setData1] = useState<AdRateType[]>([])
    useEffect(() => {
        fetch('http://localhost:3001/ad-rates/type/1')
            .then((res) => res.json())
            .then((data) => {
                setData1(data)
            })
    }, [])
    const [data2, setData2] = useState<AdRateType[]>([])
    useEffect(() => {
        fetch('http://localhost:3001/ad-rates/type/2')
            .then((res) => res.json())
            .then((data) => {
                setData2(data)
            })
    }, [])
    const [data3, setData3] = useState<AdRateType[]>([])
    useEffect(() => {
        fetch('http://localhost:3001/ad-rates/type/3')
            .then((res) => res.json())
            .then((data) => {
                setData3(data)
            })
    }, [])
    const [data4, setData4] = useState<AdRateType[]>([])
    useEffect(() => {
        fetch('http://localhost:3001/ad-rates/type/4')
            .then((res) => res.json())
            .then((data) => {
                setData4(data)
            })
    }, [])
    const [data5, setData5] = useState<AdRateType[]>([])
    useEffect(() => {
        fetch('http://localhost:3001/ad-rates/type/5')
            .then((res) => res.json())
            .then((data) => {
                setData5(data)
            })
    }, [])
    const [data7, setData7] = useState<AdRateType[]>([])
    useEffect(() => {
        fetch('http://localhost:3001/ad-rates/type/7')
            .then((res) => res.json())
            .then((data) => {
                setData7(data)
            })
    }, [])

    return (
        <div className="px-12 py-10">
            <section className="flex flex-col items-center justify-center py-10 text-center">
                <h1 className="text-3xl font-bold">Danh sách Ad Rate</h1>
                <p className="text-xl">Danh sách Ad Rate theo từng loại</p>
            </section>
            <section>
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <a href="#adrate-1" className="px-4 py-2">Jump to Ad Rate loại 1</a>
                    <a href="#adrate-2" className="px-4 py-2">Jump to Ad Rate loại 2</a>
                    <a href="#adrate-3" className="px-4 py-2">Jump to Ad Rate loại 3</a>
                    <a href="#adrate-4" className="px-4 py-2">Jump to Ad Rate loại 4</a>
                    <a href="#adrate-5" className="px-4 py-2">Jump to Ad Rate loại 5</a>
                    <a href="#adrate-7" className="px-4 py-2">Jump to Ad Rate loại 7</a>
                </div>

                <h1 id="adrate-1" className="px-4 py-4 text-3xl text-primary">Ad Rate loại 1</h1>
                <DataTable columns={columns1} data={data1} />
                <h1 id="adrate-2" className="px-4 py-4 pt-16 text-3xl text-primary">Ad Rate loại 2</h1>
                <DataTable columns={columns2} data={data2}/>
                <h1 id="adrate-3" className="px-4 py-4 pt-16 text-3xl text-primary">Ad Rate loại 3</h1>
                <DataTable columns={columns3} data={data3}/>
                <h1 id="adrate-4" className="px-4 py-4 pt-16 text-3xl text-primary">Ad Rate loại 4</h1>
                <DataTable columns={columns4} data={data4}/>
                <h1 id="adrate-5" className="px-4 py-4 pt-16 text-3xl text-primary">Ad Rate loại 5</h1>
                <DataTable columns={columns5} data={data5}/>
                <h1 id="adrate-7" className="px-4 py-4 pt-16 text-3xl text-primary">Ad Rate loại 7</h1>
                <DataTable columns={columns7} data={data7}/>

            </section>
            <a className="fixed right-1 bottom-0 text-2xl accent-red-600" href="#"><ArrowBigUpDash size={48}/></a>
        </div>

    )
}
