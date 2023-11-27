import {
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ListViewProps {
  isAvatarExists: boolean;
  data: Array<any>;
  setData: any;
  disabled?: boolean;
}

export const ListView = ({
  isAvatarExists,
  data,
  setData,
  disabled,
}: ListViewProps) => {
  const handleRemove = (id: any) => {
    setData((prev: any) => [...prev]?.filter((i) => i?.id !== id));
  };

  return (
    <List dense={false}>
      {data?.map((d: any, index) => (
        <>
          <ListItem
            key={index}
            secondaryAction={
              !disabled ? (
                <IconButton
                  onClick={() => handleRemove(d?.id)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                <></>
              )
            }
          >
            {isAvatarExists && (
              <ListItemAvatar>
                <Avatar alt="collaborator avatar" src={d?.profileImg} />
              </ListItemAvatar>
            )}
            <ListItemText primary={d?.primary} secondary={d?.secondary} />
          </ListItem>
          {index !== data?.length - 1 && <Divider component="li" />}
        </>
      ))}
    </List>
  );
};
