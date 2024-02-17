import Selectable from "../../atoms/buttons/selectable";

export default function Categories() {
  return (
    <div className="bg-blue-400 pt-2 pb-2">
      <Selectable selected={true}>Images</Selectable>
      <Selectable selected={true}>Youtube Videos</Selectable>
      <Selectable selected={true}>Document Texts</Selectable>
    </div>
  )
}