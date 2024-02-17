const searchStyles = {
    input: 'w-full h-12 border border-slate-300 py-2 pl-10 pr-7 text-xl outline-none rounded',
    inputFocus: 'w-full h-12 border-x-0 border-t-0 border-b border-blue-300 py-2 pl-10 pr-7 text-xl outline-none sm:rounded sm:border',
    query: 'text-slate-800 placeholder-slate-400',
    typeahead: 'text-blue-300 border-white',
    cancelButton: `absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 text-blue-400 inline-flex sm:hidden`,
    clearButton: 'absolute bg-blue-300 inset-y-0 right-0 w-16 inline-flex items-center justify-center text-slate-700 hover:text-white',
    listbox: 'w-full bg-white sm:border sm:border-blue-300 sm:rounded text-left sm:mt-2 p-2 sm:drop-shadow-xl',
    groupHeading: 'cursor-default mt-2 mb-0.5 px-1.5 uppercase text-sm text-rose-300',
    item: 'cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-slate-700',
    highlightedItem: 'cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-slate-700 rounded bg-blue-50'
};

const Styles = {
  searchStyles,
};

export default Styles;