import "./Modal.css"

export const Modal = ({active, setActive}) => {
  return (
    <div className={active ? 'modal active' : 'modal'}>
      <div className='modal__content'>
        <button onClick={() => setActive(false)}>
          X
        </button>
      </div>
    </div>
  )
}