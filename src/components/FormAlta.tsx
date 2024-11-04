import React, { useState, useEffect } from 'react';

const FormAlta: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [dataAlta, setDataAlta] = useState<string>('');
  const [horaAlta, setHoraAlta] = useState<string>('');
  const [motivoAlta, setMotivoAlta] = useState<string>('');
  const [motivoOutro, setMotivoOutro] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // Formato de data "YYYY-MM-DD"
    const time = now.toTimeString().split(' ')[0]; // Formato de hora "HH:MM:SS"

    setDataAlta(date);
    setHoraAlta(time);
  }, []);

  const handleAlta = () => {
    alert(`Realizando alta do paciente com CPF: ${cpf}`);
    // Lógica para enviar os dados da alta
  };

  return (
    <div className="main-content">
      <div className="form-card">
        <h3>Alta Hospitalar</h3>

        <div className="form-group">
          <label>CPF do Paciente</label>
          <input
            type="text"
            placeholder="Digite o CPF do paciente"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Data da Alta</label>
          <input
            type="date"
            value={dataAlta}
            onChange={(e) => setDataAlta(e.target.value)}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Hora da Alta</label>
          <input
            type="time"
            value={horaAlta}
            onChange={(e) => setHoraAlta(e.target.value)}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Motivo da Alta</label>
          <select
            value={motivoAlta}
            onChange={(e) => setMotivoAlta(e.target.value)}
            required
          >
            <option value="">Selecione o motivo</option>
            <option value="cura">Cura – O paciente completou o tratamento e se recuperou.</option>
            <option value="melhora">Melhora – O paciente apresentou melhoras, mas pode precisar de acompanhamento.</option>
            <option value="transferencia">Transferência – O paciente foi transferido para outro hospital ou unidade de saúde para continuidade do tratamento.</option>
            <option value="a-pedido">A pedido – A alta foi solicitada pelo paciente ou familiares, mesmo que não seja recomendada pela equipe médica.</option>
            <option value="obito">Óbito – O paciente faleceu durante a internação.</option>
            <option value="tratamento-concluido">Tratamento concluído – O paciente finalizou o protocolo de tratamento definido pela equipe médica.</option>
            <option value="outros">Outros – Usado para motivos específicos não cobertos pelas opções anteriores.</option>
          </select>
        </div>

        {motivoAlta === 'outros' && (
          <div className="form-group">
            <label>Especifique o Motivo</label>
            <input
              type="text"
              placeholder="Digite o motivo específico"
              value={motivoOutro}
              onChange={(e) => setMotivoOutro(e.target.value)}
            />
          </div>
        )}

        <button onClick={handleAlta}>Confirmar Alta</button>
      </div>
    </div>
  );
};

export default FormAlta;
