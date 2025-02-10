import { Modal } from '@/components/modal'
import { ButtonLib } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { DetailTable } from './Table'

export const WarningTable = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Modal
      open={openModal}
      onOpenChange={setOpenModal}
      onCloseAutoFocus={() => {}}
      title="Warning Alert"
      head={
        <ButtonLib className="h-6 w-6" variant="ghost" size="icon">
          <Trash className="text-red-600" />
        </ButtonLib>
      }
      body={
        <div>
          <p>
            List of vocabs you need to replace new subject before deleting this
            subject.
          </p>

          <DetailTable data={[]} />
        </div>
      }
      className="max-h-[90vh] w-full max-w-[100vh] overflow-x-auto"
    />
  )
}
