import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

const FormAlta: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [dataAlta, setDataAlta] = useState<string>('');
  const [horaAlta, setHoraAlta] = useState<string>('');
  const [motivoAlta, setMotivoAlta] = useState<string>('');
  const [motivoOutro, setMotivoOutro] = useState<string>('');
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const formatarDataBr = (dataISO: string): string => {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const formatarHoraBr = (horaISO: string): string => {
    return horaISO.slice(0, 5); 
  };

  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; 
    const time = now.toTimeString().split(' ')[0]; 

    setDataAlta(formatarDataBr(date)); 
    setHoraAlta(formatarHoraBr(time));
  }, []);

  const handleAlta = async () => {
    setMensagem(null);
    setLoading(true);
  
    const altaData = {
      cpf,
      dataAlta: dataAlta.split('/').reverse().join('-'), 
      horaAlta,
      motivoAlta,
      motivoOutro: motivoAlta === 'outros' ? motivoOutro : '',
    };
  
    try {
      const response = await axios.patch(`http://localhost:3000/patients/${cpf}/alta`, altaData);
  
      // Verificação para garantir que a resposta não seja nula ou inválida
      if (!response || !response.data) {
        setMensagem('Resposta inválida do servidor. Tente novamente.');
        return;
      }
  
      if (response.status === 200) {
        setMensagem('Alta confirmada com sucesso!');
      } else {
        setMensagem('Ocorreu um erro ao confirmar a alta.');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
  
      // Tratamento específico para respostas com status conhecido
      if (axiosError.response?.status === 404) {
        setMensagem('CPF não encontrado. Verifique e tente novamente.');
      } else {
        setMensagem('Erro ao conectar com a API. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
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
            onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))} 
            maxLength={11}
            required
          />
        </div>

        <div className="form-group">
          <label>Data da Alta</label>
          <input
            type="date"
            value={dataAlta.split('/').reverse().join('-')} 
            onChange={(e) => setDataAlta(formatarDataBr(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Hora da Alta</label>
          <input
            type="time"
            value={horaAlta}
            onChange={(e) => setHoraAlta(formatarHoraBr(e.target.value))}
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

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <button onClick={handleAlta} disabled={loading}>
          {loading ? 'Confirmando...' : 'Confirmar Alta'}
        </button>
      </div>
    </div>
  );
};

export default FormAlta;
