import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SESSION_TYPES, DEFAULT_USER, ADMIN_USER, CREATOR_USER } from "../../../utils/constants";
import Button from "../../atoms/buttons/button";
import sessionActions from "../../../redux/actions/sessionActions";
import Modal from "../../atoms/modal";
import Categoryform from "../../molecules/category-form";
import TopicForm from "../../molecules/topic-form";
import ContentForm from "../../molecules/content-form";
import { setClientToken } from "../../../client";

export default function Navbar() {
  const currentSession = useSelector((state) => state.session);
  const [sessionType, setSessionType] = useState(SESSION_TYPES[currentSession?.role || DEFAULT_USER].name);
  const [activeModal, setActiveModal] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if(currentSession?.token){
      setSessionType(SESSION_TYPES[currentSession.role].name);
      setClientToken(currentSession.token);
    } else {
      setSessionType(SESSION_TYPES[DEFAULT_USER].name);
    }
  }, [currentSession]);

  const refresh = () => {
    setActiveModal('');
    window.location.reload();
  }

  const handleLogout = () => {
    dispatch({type: sessionActions.REMOVE_SESSION});
  }

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link className="text-white font-bold text-lg" to='/'>
            <div className="flex">
              <img src="/src/assets/logo.png" alt="vite" className="h-8"/>
              <span className="ml-2 pt-1">Media Collector</span>
            </div>
          </Link>
        </div>
        {sessionType === DEFAULT_USER && (
          <div>
            <Link className="text-gray-200 hover:text-white mr-4" to='/login'>Iniciar Sesión</Link>
            <Link className="text-gray-200 hover:text-white" to='/signup'>Registrarme</Link>
          </div>
        ) || (
          <div>
            <Link className="text-gray-200 hover:text-white mr-4" to='/dashboard'>Bienvenido {currentSession.user.username}</Link>
            {(sessionType == ADMIN_USER || CREATOR_USER) && (<Button onClick={()=>{setActiveModal('addCategory')}} className="bg-green-400 rounded border-solid border-2 border-green-600 text-gray-600 mr-2">Agregar categoría</Button>)}
            {(sessionType == ADMIN_USER || CREATOR_USER) && (<Button onClick={()=>{setActiveModal('addTopic')}} className="bg-green-400 rounded border-solid border-2 border-green-600 text-gray-600 mr-2">Agregar temática</Button>)}
            <Button onClick={()=> setActiveModal('addContent')} className="bg-green-400 rounded border-solid border-2 border-green-600 text-gray-600 mr-2">Subir Contenido</Button>
            <Button className="text-gray-200 hover:text-white" onClick={()=>handleLogout()}>Cerrar Sesión</Button>
          </div>
        )}
      </div>
      
      {activeModal === 'addCategory' && (
        <Modal title="Agregar categoría" show={true} onClose={()=>setActiveModal('')}>
          <Categoryform onSuccess={()=>refresh()} onAbort={()=>setActiveModal('')} />
        </Modal>
      )}
      {activeModal === 'addTopic' && (
        <Modal title="Agregar temática" show={true} onClose={()=>setActiveModal('')}>
          <TopicForm onSuccess={()=>refresh('')} onAbort={()=>setActiveModal('')}/>
        </Modal>
      )}
      {activeModal === 'addContent' && (
        <Modal title="Subir Contenido" show={true} onClose={()=>setActiveModal('')}>
          <ContentForm onSuccess={()=>refresh('')} onAbort={()=>setActiveModal('')}/>
        </Modal>
      )}
    </nav>
  );
}