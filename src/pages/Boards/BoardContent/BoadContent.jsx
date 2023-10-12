import {
  DndContext,
  DragOverlay,
  closestCorners,
  defaultDropAnimationSideEffects,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useCallback, useEffect, useRef, useState } from 'react'
import { mapOrder } from '~/utils/sorts'
import ListColumn from './ListColumns/ListColumn'
import Column from './ListColumns/Column/Column'
import TrelloCard from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, over } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // yeu cau chuot di chuyen 10px moi kich hoat event
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  const mySensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // cùng 1 thời điểm chỉ có 1 phần tử được kéo
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // tim column theo card id
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) => column?.cards?.map((card) => card._id)?.includes(cardId))
  }

  // cap nhat state khi di chuyen card giua cac columns
  const moveCardBetweenDifferentColums = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      // tim vi tri cua overcard trong column dich
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)
      // logic tinh toan cho card index moi muc dich chinh la lay newCardIndex con ben tren copy cua thu vien :) tu choi hieu
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // clone mang orderedColumns cu ra mot const moi de xu ly data roi rerturn set state lai
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

      if (nextActiveColumn) {
        // xoa card khoi columns cu
        nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDraggingCardId)
        // cap nhat mang cardsOderIds o bang cu
        nextActiveColumn.cardsOderIds = nextActiveColumn.cards.map((card) => card._id)
      }
      if (nextOverColumn) {
        // kiem tra dragging card da ton tai o bang moi chua neu co roi thi xoa di
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDraggingCardId)

        const rebuild_activeDraggingCardId = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        // them card dang keo vao overClumn theo vi tri index moi
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardId)
        // cap nhat mang cardsOderIds o bang moi
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
      }

      return nextColumns
    })
  }

  // trigger khi bat dau keo
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)

    // neu keo card thuc hien set old column
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // trigger trong qua trinh keo
  const handleDragOver = (event) => {
    // khong lam gi them neu nhu keo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // neu keo card xu ly them neu keo qua lai giua cac column
    const { active, over } = event
    // kiem tra neu khong ton tai over hoac active (khi keo ra khoi pham vi container) thi return luon tranh loi
    if (!active || !over) return
    // activeDraggingCardId: la cai card dang duoc keo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    // overCardId: la cai card dang tuong tac tren hoac duoi so voi cai card duoc keo
    const { id: overCardId } = over
    // tim 2 cai column theo CardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // neu khong ton tai 1 trong 2 column thi khong lam gi tranh loi
    if (!activeColumn || !overColumn) return

    // xu li logic trong khi drag tai day khi va chi khi keo qua 2 columns khac nhau con keo trong column cu thi khong lam gi
    // day chi xu li trong khi keo con lai day sang trigger handleDragEnd
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColums(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  // trigger ket thuc mot hanh dong keo
  const handleDragEnd = (event) => {
    const { active, over } = event
    // kiem tra neu khong ton tai over hoac active (khi keo ra khoi pham vi container) thi return luon tranh loi
    if (!active || !over) return

    // xu ly neu keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      // overCardId: la cai card dang tuong tac tren hoac duoi so voi cai card duoc keo
      const { id: overCardId } = over
      // tim 2 cai column theo CardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // neu khong ton tai 1 trong 2 column thi khong lam gi tranh loi
      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColums(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        console.log('keo trong cung 1 col')
        // lay vi tri cu tu oldColumnWhenDraggingCard
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex((c) => c._id === activeDragItemId)
        // lay vi tri moi tu overColumn
        const newCardIndex = overColumn?.cards?.findIndex((c) => c._id === overCardId)

        // dung array move vi keo card trong 1 col tuong tu voi logic keo column trong board content
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        setOrderedColumns((prevColumns) => {
          // clone mang orderedColumns cu ra mot const moi de xu ly data roi rerturn set state lai
          const nextColumns = cloneDeep(prevColumns)

          // tim toi cai column minh dang tha
          const tartgetColumns = nextColumns.find((card) => card._id === overColumn._id)

          // cap nhat card va cardorderids trong target col
          tartgetColumns.cards = dndOrderedCards
          tartgetColumns.cardOrderIds = dndOrderedCards.map((card) => card._id)

          return nextColumns
        })
      }
    }
    // xu ly neu keo tha column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // neu vi tri sau khi keo tha khac voi vi tri ban dau
      if (active.id !== over.id) {
        // lay vi tri cu tu active
        const oldColumnsIndex = orderedColumns.findIndex((c) => c._id === active.id)
        const newIColumsIndex = orderedColumns.findIndex((c) => c._id === over.id)

        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnsIndex, newIColumsIndex)
        /*
         *  doan nay dung de call api sau nay
         *  const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)
         *  console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)
         * */

        // cap nhật state ban đầu sau kéo thả
        setOrderedColumns(dndOrderedColumns)
      }
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }
      const pointerIntersection = pointerWithin(args)
      const intersections = !!pointerIntersection?.length ? pointerIntersection : rectIntersection(args)
      let overId = getFirstCollision(intersections, 'id')
      if (overId) {
        const checkColumn = orderedColumns.find((column) => column._id === overId)
        if (checkColumn) {
          overId = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) => {
              return container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id)
            })
          })[0]?.id
        }
        lastOverId.current = overId
        return [{ id: overId }]
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )

  return (
    <DndContext
      sensors={mySensors}
      // collisionDetection={closestCorners}
      // tu custom nang cao thuat toan va cham
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumn columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <TrelloCard card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
