import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useData } from '../contexts/DataContext';
import useStyles from './PageStyles'; // Importando os estilos
import AddIcon from '@mui/icons-material/Add';

interface Topic {
  id: string;
  question: string;
}

interface TopicPosition {
  topicId: string;
  position: number;
}

interface ContentPart {
  text: string;
  positions: TopicPosition[];
}


interface Model {
  id: string;
  name: string;
  content: ContentPart[];
}

export const ModelsPage: React.FC = () => {
  const classes = useStyles();
  const { topics, models, addModel } = useData(); // Usando o DataContext para acessar os modelos globais e função de adicionar modelo
  const textFieldRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [modelName, setModelName] = useState('');
  const [modelContent, setModelContent] = useState<ContentPart[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<string>('');

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const topicId = event.dataTransfer.getData('text');
    const topic = topics.find(t => t.id === topicId);
    if (topic && textFieldRef.current) {
      const range = document.caretRangeFromPoint(event.clientX, event.clientY);
      const topicText = `{${topic.question}}`;
      if (range) {
        const span = document.createElement("span");
        span.innerText = topicText;
        span.style.color = 'blue';
        range.insertNode(span);

        const position = range.startOffset;
        setModelContent(prevContent => [
          ...prevContent,
          { text: topicText, positions: [{ topicId, position }] }
        ]);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const range = document.caretRangeFromPoint(event.clientX, event.clientY);
    if (range && textFieldRef.current) {
      textFieldRef.current.focus();
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const handleSave = () => {
    if (textFieldRef.current) {
      setOpen(true); // Abrir modal para entrada do nome do modelo
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleModelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModelName(event.target.value);
  };

  const handleSaveModel = () => {
    if (modelName.trim() === '') {
      alert('O nome do modelo não pode estar vazio.');
      return;
    }
  
    if (textFieldRef.current) {
      // Obtém o HTML da área de texto
      const htmlContent = textFieldRef.current.innerHTML;
  
      // Converte HTML para texto e identifica placeholders
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const textNodes = doc.body.childNodes;
      const contentParts: ContentPart[] = [];
      let currentText = '';
      let positions: TopicPosition[] = [];
  
      textNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          currentText += node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          if (element.tagName === 'SPAN' && element.style.color === 'blue') {
            // Adiciona o texto atual como uma parte do modelo
            if (currentText) {
              contentParts.push({ text: currentText, positions });
              currentText = '';
              positions = [];
            }
  
            // Adiciona a parte do tópico
            const topicId = topics.find(t => `{${t.question}}` === element.innerText)?.id;
            if (topicId) {
              positions.push({ topicId, position: 0 });
            }
          }
        }
      });
  
      // Adiciona o texto restante
      if (currentText) {
        contentParts.push({ text: currentText, positions });
      }
  
      // Cria o novo modelo com o conteúdo formatado
      const newModel: Model = {
        id: Date.now().toString(), // Usar uma lógica mais robusta para gerar ID em produção
        name: modelName,
        content: contentParts
      };
      
      // Adiciona o modelo ao contexto global
      addModel(newModel);
      console.log('Modelo salvo:', newModel);
      handleDialogClose();
    }
  };  
  
  const handleModelSelect = (event: SelectChangeEvent<string>) => { 
    const selectedId = event.target.value as string;
    console.log('Selected value:', selectedId);
    const selectedModel = models.find(model => model.id === selectedId);
    if (selectedModel) {
      renderModelContent(selectedModel); // Atualiza o conteúdo da caixa de texto
    }
  };

  // const handleDragStart = (event: React.DragEvent<HTMLSpanElement>) => {
  //   const topicId = event.dataTransfer.getData('text');
  //   setModelContent(prevContent =>
  //     prevContent.filter(contentPart =>
  //       !contentPart.positions.some(position => position.topicId === topicId)
  //     )
  //   );
  // };

  // Aqui você pode chamar addDragEvents em um useEffect ou outro ponto adequado
  useEffect(() => {
    addDragEvents();
  }, []);

  useEffect(() => {
    const handleDragEnd = () => {
      // Remove o clone do DOM após o arrasto
      const clones = document.querySelectorAll(`.${classes.dragCloneImage}`);
      clones.forEach(clone => clone.remove());
    };
  
    window.addEventListener('dragend', handleDragEnd);
  
    console.log('handleDragEnd Listener');
    return () => {
      window.removeEventListener('dragend', handleDragEnd);
    };
  }, [classes.dragCloneImage]);

  //Definição da função handleDragStart
  const handleDragStart = (event: DragEvent) => {
    const target = event.target as HTMLDivElement;
    if (target) {

      // Clona o elemento
      const clone = target.cloneNode(true) as HTMLDivElement;
      clone.classList.add(classes.dragCloneImage); // Aplica o estilo do clone

      // Adiciona o clone ao DOM, fora da tela
      clone.style.position = 'absolute';
      clone.style.top = '-9999px'; // Move o clone para fora da visualização
      clone.style.left = '-9999px';
      document.body.appendChild(clone);

      // Define a imagem de arrasto personalizada
      if (event.dataTransfer) {
        event.dataTransfer.setDragImage(clone, 0, 0);
        // Exibe o clone no console
        console.log('Clone do elemento:', clone);
      }
      else {
        console.log('event.dataTransfer é null');

      }
      // Remove o elemento do DOM
      target.parentElement?.removeChild(target);
      
      console.log('Elemento arrastado:', target.innerText);
    }    
  };

  // const handleDragStart = (event: DragEvent) => {
  //   const target = event.target as HTMLDivElement; // Identifica o elemento arrastado
  
  //   if (target) {
  //     // Define o "drag image" para o evento de arrasto (opcional)
  //     event.dataTransfer?.setDragImage(target, 0, 0);
  
  //     // Remover o elemento do DOM ao iniciar o arrasto
  //     target.remove(); // Remove o elemento do DOM
  //   }
  // };

  // const handleDragStart = (event: DragEvent) => {
  //   const target = event.target as HTMLDivElement;

  //   if (target) {
  //     // Criar uma cópia do elemento para usar como imagem de arrasto
  //     const dragImage = target.cloneNode(true) as HTMLDivElement;
  //     dragImage.style.position = 'absolute';
  //     dragImage.style.top = '-9999px'; // Move o elemento para fora da visualização
  //     document.body.appendChild(dragImage);

  //     // Definir a imagem de arrasto personalizada
  //     event.dataTransfer?.setDragImage(dragImage, 0, 0);

  //     // Remover o elemento original do DOM
  //     target.remove();

  //     // Adicionar um listener para limpar o clone após o arrasto
  //     if (event.target != null) {
  //       event.target.addEventListener('dragend', () => {
  //         dragImage.remove();
  //       }, { once: true }); // O listener será removido após a primeira execução
  //     }
  //   }
  // };

  const addDragEvents = () => {
    console.log('addDragEvents');
    const topicElements = document.querySelectorAll(`.${classes.topic}`);
    topicElements.forEach(element => {
      element.addEventListener('dragstart', handleDragStart as EventListener);
      console.log('addEventListener');
    });
  };

  const renderModelContent = (model: Model) => {
    if (textFieldRef.current) {
      let htmlContent = '';
      let lastIndex = 0;
  
      // Itera sobre cada parte do conteúdo do modelo
      model.content.forEach(part => {
        // Adiciona o texto anterior antes da parte atual
        htmlContent += part.text;
  
        // Adiciona os tópicos nas posições correspondentes
        part.positions.forEach(position => {
          const topic = topics.find(t => t.id === position.topicId);
          if (topic) {
            //const topicHtml = `<span style="color: blue; cursor: pointer;" draggable="true">{${topic.question}}</span>`;
            const topicHtml = `<div  
            class="${classes.topic}" 
            draggable="true" 
            data-topic-id="${topic.id}">
              ${topic.question}
            </div>`;
            htmlContent = htmlContent.slice(0, position.position + lastIndex) +
              topicHtml + 
              htmlContent.slice(position.position + lastIndex);
          }
        });
  
        lastIndex += part.text.length;
      });
  
      // Atualiza o conteúdo da área de texto com o HTML gerado
      textFieldRef.current.innerHTML = htmlContent;
  
      // Ajusta a posição do cursor para o início
      const range = document.createRange();
      const selection = window.getSelection();
      if (selection) {
        range.setStart(textFieldRef.current.firstChild || textFieldRef.current, 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  // useEffect(() => {
  //   const handleDragStartBound = handleDragStart.bind(window);

  //   // Adiciona o evento dragstart ao elemento criado dinamicamente
  //   const addDragEvents = () => {
  //     const topicElements = document.querySelectorAll(`.${classes.topic}`);
  //     topicElements.forEach(element => {
  //       element.addEventListener('dragstart', handleDragStartBound as EventListener);
  //     });
  //   };
  
  //   if (textFieldRef.current) {
  //     addDragEvents();
  //   }
  
  //   // Limpa os eventos quando o componente é desmontado ou quando o conteúdo é atualizado
  //   return () => {
  //     const topicElements = document.querySelectorAll(`.${classes.topic}`);
  //     topicElements.forEach(element => {
  //       element.removeEventListener('dragstart', handleDragStartBound as EventListener);
  //     });
  //   };
  // }, [modelContent, classes.topic]);

  const handleAddModel = () => {
    if (textFieldRef.current) {
      setOpen(true); // Abrir modal para entrada do nome do modelo
    }
  };

  return (
    <Box className={classes.root}>
      {/* Lateral Esquerda: Lista de Tópicos */}
      <Box className={classes.leftSide}>
        <Typography variant="h4" gutterBottom>
          Tópicos
        </Typography>
        {topics.map((topic) => (
          <Paper
            key={topic.id}
            className={classes.paper}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text', topic.id)}
          >            
            {topic.question}
          </Paper>
        ))}
      </Box>

      {/* Lateral Direita: Área de Texto */}
      <Box className={classes.rightSide} onDrop={handleDrop} onDragOver={handleDragOver}>
        <Box className={classes.selectContainer}>
          <Select
            value={selectedModelId}
            onChange={handleModelSelect}
            displayEmpty
            className={classes.select}
          >
            <MenuItem value="">
              <em>Selecione um modelo</em>
            </MenuItem>
            {models.map((model) => (
              <MenuItem key={model.id} value={model.id}>
                {model.name}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddModel}
            className={classes.addButton}
          >
            <AddIcon />
          </Button>
        </Box>
        <Box
          contentEditable
          ref={textFieldRef}
          className={classes.textField}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          className={classes.save}
        >
          Salvar
        </Button>
      </Box>

      {/* Modal para Nome do Modelo */}
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Nome do Modelo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do Modelo"
            type="text"
            fullWidth
            variant="outlined"
            value={modelName}
            onChange={handleModelNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveModel} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
