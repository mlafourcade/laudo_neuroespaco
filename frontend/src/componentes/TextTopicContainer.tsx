// src/componentes/TextTopicContainer.tsx
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { Answer } from '../contexts/DataContext';

interface TextTopicContainerProps {
  topic: { id: string; question: string; answers: Answer[] };
  answers: Answer[];
  onAddText: (topicId: string, answerId: string) => void;
}

export const TextTopicContainer: React.FC<TextTopicContainerProps> = ({ topic, answers, onAddText }) => {

  return (
    <Box sx={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <Typography variant="h6">{topic.question}</Typography>
      <List>
        {answers.map((answer) => (
          <ListItem key={answer.id}>
            <ListItemText primary={answer.text} />
            {answer.responseText && <ListItemText secondary={answer.responseText} />}
            <Button variant="contained" color="primary" onClick={() => onAddText(topic.id, answer.id)}>
              Adicionar Texto
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

// // src/componentes/TextTopicContainer.tsx
// import React from 'react';
// import { Box, Typography, Grid, Button } from '@mui/material';
// import { AnswerContainer } from './AnswerContainer'; // Se houver um componente específico para isso

// interface TextTopicContainerProps {
//   topic: { id: string; question: string };
//   answers: { answer: string; texts: string[] }[];
//   onAddText: (answerId: string, text: string) => void;
// }

// export const TextTopicContainer: React.FC<TextTopicContainerProps> = ({ topic, answers, onAddText }) => {
//   return (
//     <Box sx={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
//       <Typography variant="h5" gutterBottom>
//         {topic.question}
//       </Typography>
//       {answers.map((answerObj, index) => (
//         <Grid container spacing={2} key={index} alignItems="flex-start">
//           <Grid item xs={12} md={4}>
//             <Box sx={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
//               <Typography variant="body1" gutterBottom>
//                 {answerObj.answer}
//               </Typography>
//               <Button variant="contained" size="small" onClick={() => onAddText(topic.id, answerObj.answer)}>
//                 Adicionar Texto
//               </Button>
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={8}>
//             <Box sx={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
//               {answerObj.texts.map((text, textIndex) => (
//                 <Typography key={textIndex} variant="body2" paragraph>
//                   {text}
//                 </Typography>
//               ))}
//             </Box>
//           </Grid>
//         </Grid>
//       ))}
//     </Box>
//   );
// };