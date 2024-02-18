import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function Soon() {
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 });
  }

  const showInfo = () => {
    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
  }

  const showWarn = () => {
    toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Message Content', life: 3000 });
  }

  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Message Content', life: 3000 });
  }

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
      <Button onClick={showSuccess} label="Show" />
      <Button onClick={showInfo} label="Show" />
      <Button onClick={showWarn} label="Show" />
      <Button onClick={showError} label="Show" />
    </div>
  )
}