import { useContext, useEffect, useRef } from "react";
//import { CSSTransition } from "react-transition-group";
import { BankAccountsContext } from "../../../../../context/Buys/Banks/BankAccountsContext";


function BanksAccountsNew() {

    //const nodeRef = useRef(null)
    const { createBankAccount, dataBanks } = useContext(BankAccountsContext)


    function handleSubmit(e) {
        e.preventDefault()
        let bank = e.target.bank.value
        let number = e.target.number.value
        let type = e.target.type.value
        let owner = 0
        let balance = 0
        createBankAccount(bank, number, type, owner, balance)

    }

    return (
        // <CSSTransition nodeRef={nodeRef} in={showFormSupplier} timeout={200} classNames="container" unmountOnExit appear={true}
        //     onEnter={() => { setshowFormNew(false) }}>

        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit} className="flex gap-3 p-5 justify-center items-center" >
                <div className="w-fit shadow-xl p-5 mt-2.5 mb-2.5 dark:shadow-none bg-white dark:bg-dark-ing-800">
                    <div className='flex justify-center'>
                        <h2>NUEVO BANCO</h2>
                    </div>
                </div>
                <div className="relative">
                    <input
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent focus:border-t-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=""
                        id='number'

                        required
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Numero
                    </label>
                </div>
                <div className="relative h-10 w-72 min-w-[200px]">
                    <select
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        id='bank'
                    >
                        {/* mapeo encargado de insertar los proveedores registrados*/}
                        {dataBanks.map((bank, index) => (
                            <option key={index} className="dark:bg-dark-ing-900" value={bank.id}>{bank.name}</option>
                        ))}
                    </select>
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Banco
                    </label>
                </div>
                <div className="relative h-10 w-72 min-w-[200px]">
                    <select
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        id='type'
                    >
                        <option value="ahorros" className="dark:bg-dark-ing-900">Ahorros</option>
                        <option value="Corriente" className="dark:bg-dark-ing-900">Corriente</option>
                        <option value="Bolsillo" className="dark:bg-dark-ing-900">Bolsillo</option>
                    </select>
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Banco
                    </label>
                </div>
                <button
                    className="middle none center mr-3 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-dark="true"
                    type="submit"
                >
                    Enviar
                </button>

            </form>
        </div>


        // </CSSTransition>
    )
}

export default BanksAccountsNew