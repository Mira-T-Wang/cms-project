import { useState, useEffect } from 'react';
import './SalesModal.css';

const emptyForm = {
  date: '', total: '', mpt: '', ooredoo: '', ooredoo_codapay: '',
  telenor: '', mec: '', mytel: '', dtac: '', kbzpay: ''
};

const SalesModal = ({ mode, initialData, onSave, onClose, error }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm({
        date: initialData.date.slice(0, 10),
        total: initialData.total,
        mpt: initialData.mpt,
        ooredoo: initialData.ooredoo,
        ooredoo_codapay: initialData.ooredoo_codapay,
        telenor: initialData.telenor,
        mec: initialData.mec,
        mytel: initialData.mytel,
        dtac: initialData.dtac,
        kbzpay: initialData.kbzpay
      });
    } else {
      setForm(emptyForm);
    }
  }, [mode, initialData]);

  useEffect(() => {
  const sum =
    Number(form.mpt) +
    Number(form.ooredoo) +
    Number(form.ooredoo_codapay) +
    Number(form.telenor) +
    Number(form.mec) +
    Number(form.mytel) +
    Number(form.dtac) +
    Number(form.kbzpay);

  setForm((prev) => ({ ...prev, total: sum }));
}, [form.mpt, form.ooredoo, form.ooredoo_codapay, form.telenor, form.mec, form.mytel, form.dtac, form.kbzpay]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const [localError, setLocalError] = useState('');
  const handleSave = () => {
    if (!form.date) {
    setLocalError('Please select a date before saving.');
    return;
  }
    setLocalError('');  
    onSave(form);
  };

  const fields = [
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'total', label: 'Total', type: 'number', disabled: true },
    { name: 'mpt', label: 'MPT', type: 'number' },
    { name: 'ooredoo', label: 'Ooredoo', type: 'number' },
    { name: 'ooredoo_codapay', label: 'Ooredoo Codapay', type: 'number' },
    { name: 'telenor', label: 'Telenor', type: 'number' },
    { name: 'mec', label: 'MEC', type: 'number' },
    { name: 'mytel', label: 'Mytel', type: 'number' },
    { name: 'dtac', label: 'DTAC', type: 'number' },
    { name: 'kbzpay', label: 'KBZPay', type: 'number' }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">
          {mode === 'add' ? 'Add New Record' : 'Edit Record'}
        </h2>

        <div className="modal-grid">
          {fields.map((field) => (
            <div className="modal-field" key={field.name}>
              <label className="modal-label">{field.label}</label>
              <input
                className="modal-input"
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                disabled={field.disabled || false}
              />
            </div>
          ))}
        </div>
        {(error || localError) && (
       <div className="modal-error">{localError || error}</div>
        )}
        <div className="modal-actions">
          <button className="modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesModal;