import { useEffect, useState, useContext } from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { ProductionContext } from '../../../../context/Production/ProductionContext';

export default function ProductionLive() {
    const { progress, currentStep } = useContext(ProductionContext)

    return (
        <div>
            <h1 className='text-xl m-5 text-center' >RECETAS ACTIVAS</h1>
            <section className='shadow-xl p-5 bg-white dark:shadow-none dark:bg-dark-ing-800'>
                <h2 className='text-center w-full'>NOMBRE RECETA</h2>
                <div className='flex gap-2'>
                    <h3>ESTADO:</h3>
                    <p className='text-green-400'>ACTIVO</p>
                </div>
                <div className='flex gap-2'>
                    <h3>PASO: </h3>
                    <p className=''>{currentStep}</p>
                </div>
                <div>

                </div>
                <ProgressBar value={progress}></ProgressBar>
            </section>
            <br />
            <section className='flex justify-center shadow-xl p-5 bg-white dark:shadow-none dark:bg-dark-ing-800'>
                <h1 className='opacity-50'>NO HAY PRODUCCIONES ACTIVAS</h1>
            </section>

            <div className='flex w-full items-center justify-center shadow-xl p-5 mt-5 mb-5 bg-white dark:shadow-none dark:bg-dark-ing-800'>
                <div className=' w-full max-h-[50rem] overflow-auto'>
                    <table className='w-full '>
                        <thead className=' border-b-slate-300 dark:text-slate-500 dark:border-b-slate-800 bg-transparent'>
                            <tr>

                            </tr>
                        </thead >
                        <tbody >

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
