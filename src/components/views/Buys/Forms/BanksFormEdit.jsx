import { useContext, useEffect, useRef } from "react";
//import { CSSTransition } from "react-transition-group";
import { BankAccountsContext } from "../../../../context/Buys/Banks/BankAccountsContext";


function BanksFormEdit() {

    //const nodeRef = useRef(null)
    const { editDataBank, EditBank} = useContext(BankAccountsContext)


    function handleSubmit(e) {
        e.preventDefault()
        let name = e.target.name.value? e.target.name.value : editDataBank.name 
        
        EditBank(editDataBank.id,name)
    }

    return (
        // <CSSTransition nodeRef={nodeRef} in={showFormSupplier} timeout={200} classNames="container" unmountOnExit appear={true}
        //     onEnter={() => { setshowFormNew(false) }}>

        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit} className="flex gap-3 p-5 justify-center items-center" >
                <div className="w-fit shadow-xl p-5 mt-2.5 mb-2.5 dark:shadow-none bg-white dark:bg-dark-ing-800">
                    <div className='flex justify-center'>
                        <h2>EDITAR BANCO</h2>
                    </div>
                </div>
                <div className="relative">
                    <input
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder={editDataBank.name} 
                        id='name'
                    />
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

export default BanksFormEdit