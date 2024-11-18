import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormTransferencia: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [codigoLeitoAtual, setCodigoLeitoAtual] = useState<string>('');
  const [codigoUnidade, setCodigoUnidade] = useState<string>('');
  const [codigoLeitoDestino, setCodigoLeitoDestino] = useState<string>('');
  const [dataTransferencia, setDataTransferencia] = useState<string>('');
  const [horaTransferencia, setHoraTransferencia] = useState<string>('');
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // Formato de data "YYYY-MM-DD"
    const time = now.toTimeString().split(' ')[0]; // Formato de hora "HH:MM:SS"

    setDataTransferencia(date);
    setHoraTransferencia(time);
  }, []);

  const handleTransferencia = async () => {
    setMensagem(null); // Resetando mensagens de erro/sucesso

    const payload = {
      cpf,
      codigoLeitoAtual,
      codigoUnidade,
      codigoLeitoDestino,
      dataTransferencia,
      horaTransferencia,
    };

    try {
      const response = await axios.post('/api/transferencia', payload);

      if (response.status === 200) {
        setMensagem('Transferência realizada com sucesso!');
      } else {
        setMensagem('Ocorreu um problema ao realizar a transferência.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Erro gerado pelo Axios
        setMensagem(error.response?.data?.message || 'Erro ao fazer a transferência.');
      } else {
        // Erro genérico que não é do Axios
        setMensagem('Erro ao conectar com o servidor.');
      }
      console.error('Erro na transferência:', error);
    }
  };

  return (
    <div className="main-content">
      <div className="form-card">
        <h3>Transferência de Leito</h3>

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
          <label>Código do Leito Atual</label>
          <input
            type="text"
            placeholder="Digite o código do leito atual"
            value={codigoLeitoAtual}
            onChange={(e) => setCodigoLeitoAtual(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Código da Unidade</label>
          <input
            type="text"
            placeholder="Digite o código da unidade"
            value={codigoUnidade}
            onChange={(e) => setCodigoUnidade(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Código do Leito Destino</label>
          <input
            type="text"
            placeholder="Digite o código do leito destino"
            value={codigoLeitoDestino}
            onChange={(e) => setCodigoLeitoDestino(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Data da Transferência</label>
          <input
            type="date"
            value={dataTransferencia}
            onChange={(e) => setDataTransferencia(e.target.value)}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Hora da Transferência</label>
          <input
            type="time"
            value={horaTransferencia}
            onChange={(e) => setHoraTransferencia(e.target.value)}
            readOnly
          />
        </div>

        {mensagem && <p className="mensagem">{mensagem}</p>} {/* Exibe mensagens */}

        <button onClick={handleTransferencia}>Confirmar Transferência</button>
      </div>
    </div>
  );
};

export default FormTransferencia;
