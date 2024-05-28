import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IntegrationForm = () => {
  const [integration, setIntegration] = useState({url: ''});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchIntegracao = async () => {
      try {
        const response = await axios.get('https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/integracao');
        setIntegration(response.data)
      } catch (error) {
      } finally {}
    };

    fetchIntegracao();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntegration(prevIntegration => ({ ...prevIntegration, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://restaurante-prod-mayrink-0fddee46.koyeb.app/api/integracao', {
        url: integration.url
      });
      setMessage('Integração alterada com sucesso!');
    } catch (error) {
      setMessage('Erro ao alterar integração. Tente novamente.');
    }
  };


  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Integração</h2>
          {message && (
            <div className="alert alert-info" role="alert">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="mx-auto">
            <div className="mb-3">
              <label htmlFor="url" className="form-label">URL Integração</label>
              <input type="text" className="form-control" id="url" name="url" value={integration.url} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-danger">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IntegrationForm;
