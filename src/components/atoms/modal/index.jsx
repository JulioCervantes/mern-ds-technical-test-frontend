export default function Modal({children, title, show, onClose}) {
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 ${show ? 'block' : 'hidden'}`}>
      <div className="w-11/12 md:w-1/2 lg:w-1/3 bg-white p-4 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}