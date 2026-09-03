"use client";

import { useEffect, useState } from "react";

interface TipoContrato {
  codigo: string;
  descricao: string;
}

export default function Home() {
  const [tipos, setTipos] = useState<TipoContrato[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarTipos() {
      try {
        const resposta = await fetch(
          "http://localhost:3000/api/contratos/tipos",
        );

        if (!resposta.ok) {
          throw new Error("Não foi possível consultar o backend.");
        }

        const dados: TipoContrato[] = await resposta.json();

        setTipos(dados);
      } catch (error) {
        setErro(
          error instanceof Error
            ? error.message
            : "Ocorreu um erro desconhecido.",
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarTipos();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-zinc-900">
            Sistema de Contratos
          </h1>

          <p className="mt-2 text-zinc-600">
            Importe uma planilha, gere contratos e envie-os para
            assinatura.
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-zinc-900">
              Tipos de contrato
            </h2>

            {carregando && (
              <p className="mt-4 text-zinc-600">
                Carregando...
              </p>
            )}

            {erro && (
              <p className="mt-4 rounded-lg bg-red-100 p-4 text-red-700">
                {erro}
              </p>
            )}

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {tipos.map((tipo) => (
                <div
                  key={tipo.codigo}
                  className="rounded-lg border border-zinc-200 p-5"
                >
                  <strong className="text-lg text-zinc-900">
                    {tipo.codigo}
                  </strong>

                  <p className="mt-1 text-zinc-600">
                    {tipo.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}