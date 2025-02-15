import { Modal } from 'antd'

const ConfirmModal = (props) => {
  const { modalTitle = '', okText = 'OK', handleOk, content, isModalOpen, setIsModalOpen } = props

  const handleOkBtn = async () => {
    await handleOk()
    setIsModalOpen(false)
  }
  const handleCancelBtn = () => {
    setIsModalOpen(false)
  }
  return (
    <Modal title={modalTitle} open={isModalOpen} onOk={handleOkBtn} onCancel={handleCancelBtn} okText={okText}>
      {content}
    </Modal>
  )
}
export default ConfirmModal
