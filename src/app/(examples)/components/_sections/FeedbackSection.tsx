'use client'

import { useState } from 'react'
import { ShowcaseBlock } from './ShowcaseBlock'
import { Banner } from '@/components/ui/Banner'
import { Callout } from '@/components/ui/Callout'
import { Modal } from '@/components/ui/Modal'
import { Drawer } from '@/components/ui/Drawer'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { NotificationCenter, type NotificationItem } from '@/components/ui/NotificationCenter'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { Divider } from '@/components/ui/Divider'

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: '1', title: 'Deploy concluído', description: 'v2.4.1 está em produção.', timestamp: 'há 2 min', read: false, variant: 'success' },
  { id: '2', title: 'Novo usuário registrado', description: 'ana@orayon.ai entrou na plataforma.', timestamp: 'há 15 min', read: false, variant: 'info' },
  { id: '3', title: 'Erro no pagamento', description: 'Cartão recusado — pedido #4821.', timestamp: 'há 1h', read: false, variant: 'error' },
  { id: '4', title: 'Backup diário concluído', description: 'Todos os dados salvos com sucesso.', timestamp: 'há 3h', read: true, variant: 'default' },
]

export function FeedbackSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS)
  const toast = useToast()

  const markRead = (id: string) => setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x))
  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })))
  const dismiss = (id: string) => setNotifications(n => n.filter(x => x.id !== id))
  const clearAll = () => setNotifications([])

  const handleConfirm = () => {
    setConfirmLoading(true)
    setTimeout(() => { setConfirmLoading(false); setConfirmOpen(false) }, 1500)
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      <ShowcaseBlock title="Banner" description="Alertas em largura total" wide>
        <div className="flex flex-col gap-2">
          <Banner variant="info">Manutenção programada para 25/05 às 02h00.</Banner>
          <Banner variant="success" onClose={() => {}}>Deploy v2.4.1 realizado com sucesso!</Banner>
          <Banner variant="warning" onClose={() => {}}>Seu plano expira em 3 dias.</Banner>
          <Banner variant="error">Falha crítica detectada — verifique os logs.</Banner>
          <Banner variant="default" action={{ label: 'Saiba mais', onClick: () => {} }} onClose={() => {}}>
            Novidades disponíveis na versão 2.1.
          </Banner>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Callout" description="Blocos de destaque em conteúdo">
        <div className="flex flex-col gap-2">
          <Callout variant="info">Use tokens CSS para manter consistência entre temas.</Callout>
          <Callout variant="tip">Prefira componentes controlados para formulários complexos.</Callout>
          <Callout variant="warning">Esta API será descontinuada em 01/07/2026.</Callout>
          <Callout variant="error">O campo CPF é obrigatório para emissão de NF-e.</Callout>
          <Callout variant="note">Documentação completa disponível em design/docs/.</Callout>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Toast" description="Notificações temporárias">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => toast.success('Registro salvo com sucesso.')}>
            Toast success
          </Button>
          <Button size="sm" variant="secondary" onClick={() => toast.error('Falha ao processar a solicitação.')}>
            Toast error
          </Button>
          <Button size="sm" variant="secondary" onClick={() => toast.warning('Dados incompletos detectados.')}>
            Toast warning
          </Button>
          <Button size="sm" variant="secondary" onClick={() => toast.info('Processamento iniciado em background.')}>
            Toast info
          </Button>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="NotificationCenter" description="Central de notificações">
        <div className="flex items-center gap-4">
          <NotificationCenter
            notifications={notifications}
            onMarkRead={markRead}
            onMarkAllRead={markAllRead}
            onDismiss={dismiss}
            onClearAll={clearAll}
          />
          <p className="text-sm text-[var(--text-muted)]">
            {notifications.filter(n => !n.read).length} não lidas de {notifications.length}
          </p>
          <Button size="sm" variant="ghost" onClick={() => setNotifications(MOCK_NOTIFICATIONS)}>
            Resetar
          </Button>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Modal" description="Diálogo centralizado com overlay">
        <Button onClick={() => setModalOpen(true)}>Abrir Modal</Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Editar perfil" description="Atualize suas informações de conta." size="md">
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--text-muted)]">
            <p>Conteúdo do modal vai aqui. Você pode adicionar formulários, listas ou qualquer componente.</p>
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>Cancelar</Button>
              <Button variant="primary" size="sm" onClick={() => setModalOpen(false)}>Salvar</Button>
            </div>
          </div>
        </Modal>
      </ShowcaseBlock>

      <ShowcaseBlock title="Drawer" description="Painel lateral deslizante">
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Abrir Drawer</Button>
        </div>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Filtros" side="right" size="sm">
          <div className="flex flex-col gap-3 pt-2 text-sm text-[var(--text-muted)]">
            <p>Conteúdo do drawer. Use para navegação lateral, filtros, detalhes ou formulários.</p>
            <Button size="sm" variant="primary" className="mt-4" onClick={() => setDrawerOpen(false)}>
              Aplicar filtros
            </Button>
          </div>
        </Drawer>
      </ShowcaseBlock>

      <ShowcaseBlock title="ConfirmDialog" description="Confirmação de ações críticas" wide>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setConfirmOpen(true)}>Confirmar ação</Button>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>Excluir registro</Button>
        </div>
        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirm}
          title="Excluir registro"
          description="Esta ação é permanente e não pode ser desfeita. Deseja continuar?"
          confirmLabel="Sim, excluir"
          cancelLabel="Cancelar"
          variant="destructive"
          isLoading={confirmLoading}
        />
      </ShowcaseBlock>

    </div>
  )
}
