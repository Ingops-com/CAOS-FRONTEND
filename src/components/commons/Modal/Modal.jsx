function Modal({ open, onClose, children }) {
    return (
        // backdrop
        <div onClick={onClose} className={`
            fixed inset-0 flex justify-center items-center transition-colors
            ${open ? "visible bg-black/20" : "invisible"}
        `}>
            {/* modal */}
            <div
                onClick={e => e.stopPropagation()}
                className={`bg-white dark:bg-dark-ing-800 rounded-xl shadow p-6 transition-all
                ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}>
                {children}
            </div>
        </div>
    )
}

export default Modal