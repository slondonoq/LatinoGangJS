import "@assets/stylesheets/layout/Modal.css";
import { useState } from "react";

interface ModalProps {
  closeModal: (value: boolean) => void;
  updateVariables: (variables: string[]) => void;
  variablesList: string[];
}

const Modal: React.FC<ModalProps> = ({
  closeModal,
  updateVariables,
  variablesList,
}) => {
  const [variable, setVariable] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVariable(value);
    const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    setIsValid(regex.test(value));
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal(false);
    }
  };

  const createVariable = () => {
    if (isValid && variable) {
      const updatedList = [...variablesList, variable];
      updateVariables(updatedList);
      setVariable("");
      closeModal(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal">
        <div className="modal-header">
          <h2>Crea una variable</h2>
          <button className="modal-close" onClick={() => closeModal(false)}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          <label htmlFor="variable-name">Nombre de la nueva variable: </label>
          <input
            type="text"
            placeholder="Nombre de la variable"
            value={variable}
            onChange={handleInputChange}
          />
          {!isValid && (
            <span className="variable-error">
              ⚠️ El nombre de la variable no es válido
            </span>
          )}
          <div className="modal-buttons">
            <button onClick={() => closeModal(false)}>Cancelar</button>
            <button onClick={createVariable}>Crear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
