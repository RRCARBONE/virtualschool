"use client";

import { use } from "react";
import Link from "next/link";
import { Award, Download, GraduationCap, ShieldCheck } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";
import { useProgress } from "@/lib/progress/use-progress";

export default function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const state = useProgress();
  const certificate = state.certificates.find((c) => c.id === id);

  if (!certificate) {
    return (
      <div className="container-app flex min-h-[60vh] flex-col items-center justify-center gap-4 py-12 text-center">
        <Award className="h-10 w-10 text-muted" />
        <h1 className="text-xl font-bold">Certificado não encontrado</h1>
        <p className="max-w-sm text-muted">
          Este certificado não está disponível neste navegador. Certificados ficam salvos localmente em modo
          demonstração — conclua um curso para gerar o seu.
        </p>
        <LinkButton href="/dashboard">Ir para o painel</LinkButton>
      </div>
    );
  }

  return (
    <div className="container-app flex flex-col items-center py-12">
      <div
        id="certificate"
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border-8 border-brand-light bg-surface p-10 text-center shadow-soft sm:p-14"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(91,61,240,0.08),transparent_60%)]" />
        <div className="flex items-center justify-center gap-2 font-extrabold">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-lg">Aprenda</span>
        </div>

        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-muted">Certificado de conclusão</p>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{certificate.studentName}</h1>
        <p className="mt-4 text-muted">concluiu com êxito o curso</p>
        <p className="mt-1 text-2xl font-bold text-brand-dark">{certificate.title}</p>
        <p className="mt-4 text-sm text-muted">
          Carga horária: {certificate.hours}h · Emitido em {new Date(certificate.issuedAt).toLocaleDateString("pt-BR")}
        </p>

        <div className="mx-auto mt-8 flex max-w-xs items-center justify-center gap-2 rounded-xl bg-surface-muted px-4 py-2.5 text-xs text-muted">
          <ShieldCheck className="h-4 w-4 text-accent" />
          Código de verificação: <span className="font-mono font-semibold text-foreground">{certificate.verificationCode}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3 print:hidden">
        <Button onClick={() => window.print()}>
          <Download className="h-4 w-4" /> Baixar / imprimir certificado
        </Button>
        <Link href="/dashboard" className="inline-flex items-center px-4 text-sm font-semibold text-brand hover:underline">
          Voltar ao painel
        </Link>
      </div>
    </div>
  );
}
