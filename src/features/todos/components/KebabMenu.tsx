import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {Box, Image} from '@chakra-ui/react';
import iconMore from '@/assets/icons/icon-more.svg';
import iconEdit from '@/assets/icons/icon-edit.svg';
import iconDelete from '@/assets/icons/icon-delete.svg';

interface KebabMenuProps {
  todoId: string;
  onDelete: () => void;
}

export function KebabMenu({todoId, onDelete}: KebabMenuProps) {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <Box position="relative" ref={menuRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Image src={iconMore} alt={t('common.actions')} width="20px" height="20px" />
      </button>

      {open && (
        <>
          <Box
            position="fixed"
            inset={0}
            zIndex={9}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          />
          <Box
            position="absolute"
            right={0}
            top="100%"
            bg="white"
            borderRadius="8px"
            boxShadow="md"
            border="1px solid #CAD1DE"
            py={1}
            zIndex={10}
            minWidth="120px"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                navigate(`/todos/${todoId}`);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                width: '100%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#001141',
              }}
            >
              <Image src={iconEdit} alt="" width="16px" height="16px" />
              {t('common.edit')}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onDelete();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                width: '100%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#B71C1C',
              }}
            >
              <Image src={iconDelete} alt="" width="16px" height="16px" />
              {t('common.delete')}
            </button>
          </Box>
        </>
      )}
    </Box>
  );
}
