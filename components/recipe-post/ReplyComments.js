import { Stack } from "@mui/material";
import ReplyComment from "./ReplyComment";

const monthNames = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ReplyComments = (props) => {
  const replies = props.replies.map((reply) => {
    const rawDate = new Date();
    const month = monthNames[rawDate.getMonth()];
    const date = rawDate.getDate().toString();
    const year = rawDate.getFullYear().toString();
    const time = date.concat(" ", month).concat(", ", year);
    return (
      <ReplyComment
        key={Math.random()}
        id={reply._id}
        username={reply.user_id.username}
        comment={reply.comment}
        time={time}
      />
    );
  });
  return (
    <Stack alignSelf='start' paddingX='10px'>
      {replies}
    </Stack>
  );
};

export default ReplyComments;
