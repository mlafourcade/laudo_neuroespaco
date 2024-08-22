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
  const { topics, models, setModels, addModel } = useData(); // Usando o DataContext para acessar os modelos globais e função de adicionar modelo
  const textFieldRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [modelName, setModelName] = useState('');
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [modelo, setModelo] = useState<Model | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const topicId = event.dataTransfer.getData('text/plain');
    const topic = topics.find(t => t.id === topicId);

    if (textFieldRef.current && topic) {
      // Cria o HTML do tópico no formato usado em renderModelContent
      const topicHtml = `&nbsp<div  
        class="${classes.topic}" 
        draggable="true" 
        data-topic-id="${topic.id}">
          ${topic.question}
        </div>`;
  
      // Insere o HTML no local correto no texto
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents(); // Remove o conteúdo atual selecionado
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = topicHtml; // Adiciona o HTML do tópico temporariamente em um div
        const frag = document.createDocumentFragment();
  
        let node;
        while ((node = tempDiv.firstChild)) {
          frag.appendChild(node); // Move os filhos do div temporário para o fragmento
        }
  
        range.insertNode(frag); // Insere o fragmento no local desejado
        range.collapse(false); // Move o cursor para depois do elemento inserido
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

  const handleAddModel = () => {
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


  const handleChangedModel = (action: number) => {

    console.log('Entrou como Action = ', action);

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
          if (element.tagName === 'DIV' && element.classList.contains(classes.topic)) {
            if (currentText) {
              contentParts.push({ text: currentText, positions });
              currentText = '';
              positions = [];
            }
  
            const topicId = element.getAttribute('data-topic-id');
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
      const modelChanged: Model = {
        id: action === 0 ? Date.now().toString(): selectedModelId, 
        name: modelName,
        content: contentParts
      };

      if (action === 0) {
        // Adiciona o modelo ao contexto global
        addModel(modelChanged);
      }
      else {
        // Atualizando o modelo no array 'models'
        const updatedModels = models.map((model) =>
          model.id === modelChanged.id ? modelChanged : model
        );

        setModels(updatedModels);
      }

      console.log('ContentParts:', contentParts);
      console.log('Positions:', positions);
      console.log('CurrentText:', currentText);
      console.log('Modelo salvo:', modelChanged);
      console.log('Array modelos:', models);
      handleDialogClose();
    }
  };  
  
  const handleModelSelect = (event: SelectChangeEvent<string>) => { 
    const selectedId = event.target.value as string;
    console.log('Selected value:', selectedId);
    setSelectedModelId(selectedId);
    const selectedModel = models.find(model => model.id === selectedId);
    if (selectedModel) {
      setModelName(selectedModel.name);
      setModelo(selectedModel);
      renderModelContent(selectedModel); // Atualiza o conteúdo da caixa de texto
    }
  };

  useEffect(() => {
  
    const topicElements = document.querySelectorAll(`.${classes.topic}`);
    topicElements.forEach(element => {
      element.addEventListener('dragstart', handleDragStart as EventListener);
      element.addEventListener('dragend', handleDragEnd as EventListener);
      console.log('addEventListener');
    });

    return () => {
      topicElements.forEach(element => {
        element.removeEventListener('dragstart', handleDragStart as EventListener);
        element.removeEventListener('dragend', handleDragEnd as EventListener);
        console.log('removeEventListener');
      });
    };
  }, [selectedModelId]);

  const handleDragEnd = () => {
    console.log('handleDragEnd');
  };

  //Definição da função handleDragStart
  const handleDragStart = (event: DragEvent) => {
    const target = event.target as HTMLDivElement;
    if (target) {
      // Cria um clone do elemento
      const clone = target.cloneNode(true) as HTMLDivElement;

      // Modifique o texto do clone
      clone.innerText = `Clone: ${target.innerText}`;

      clone.style.position = 'absolute';
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.opacity = '0.5'; // Torna o clone semi-transparente

      // Adiciona o clone ao DOM
      document.body.appendChild(clone);

      if (event.dataTransfer != null) {
        // Define o clone como a imagem do cursor para o arrasto
        event.dataTransfer.setDragImage(clone, 0, 0);
        // Armazena o ID do tópico no dataTransfer
        event.dataTransfer.setData('text/plain', target.dataset.topicId || '');

        // Atrasar a remoção do elemento original para garantir que o clone seja renderizado como imagem de arrasto
        setTimeout(() => {
          target.remove();
        }, 0);   
      }

      console.log('Elemento original:', target.innerText);
      console.log('Elemento clone:', clone.innerText);
    }    
  };

  // const renderModelContent = (model: Model) => {
  //   if (textFieldRef.current) {
  //     let htmlContent = '';
  //     let lastIndex = 0;
  
  //     // Itera sobre cada parte do conteúdo do modelo
  //     model.content.forEach(part => {
  //       // Adiciona o texto anterior antes da parte atual
  //       htmlContent += part.text;
  
  //       // Adiciona os tópicos nas posições correspondentes
  //       part.positions.forEach(position => {
  //         const topic = topics.find(t => t.id === position.topicId);
  //         if (topic) {
  //           const topicHtml = `<div  
  //           class="${classes.topic}" 
  //           draggable="true" 
  //           data-topic-id="${topic.id}">
  //             ${topic.question}
  //           </div>`;
  //           htmlContent = htmlContent.slice(0, position.position + lastIndex) +
  //             topicHtml + 
  //             htmlContent.slice(position.position + lastIndex);
  //         }
  //       });
  
  //       lastIndex += part.text.length;
  //     });
  
  //     // Atualiza o conteúdo da área de texto com o HTML gerado
  //     textFieldRef.current.innerHTML = htmlContent;
  
  //     // Ajusta a posição do cursor para o início
  //     const range = document.createRange();
  //     const selection = window.getSelection();
  //     if (selection) {
  //       range.setStart(textFieldRef.current.firstChild || textFieldRef.current, 0);
  //       range.collapse(true);
  //       selection.removeAllRanges();
  //       selection.addRange(range);
  //     }
  //   }
  // };

  const renderModelContent = (model: Model) => {
    if (textFieldRef.current) {
      let htmlContent = '';
      let lastIndex = 0;
  
      // Itera sobre cada parte do conteúdo do modelo
      model.content.forEach(part => {
        let currentPartText = part.text;
        
        // Ordena as posições para garantir a ordem correta
        const sortedPositions = [...part.positions].sort((a, b) => a.position - b.position);
  
        sortedPositions.forEach(position => {
          const topic = topics.find(t => t.id === position.topicId);
          if (topic) {
            const start = lastIndex;
            const end = position.position;
            lastIndex = end;
  
            // Texto antes do próximo tópico
            const textBefore = currentPartText.substring(start, end);
            htmlContent += textBefore;
  
            // Inserção do tópico na posição correta
            const topicHtml = `<div  
              class="${classes.topic}" 
              draggable="true" 
              data-topic-id="${topic.id}">
                ${topic.question}
              </div>`;
            htmlContent += topicHtml;
          }
        });
  
        // Adiciona o restante do texto após o último tópico
        const remainingText = currentPartText.substring(lastIndex);
        htmlContent += remainingText;
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
          onClick={() => handleChangedModel(1)}
          className={classes.save}
        >
          Atualizar
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
          <Button onClick={() => handleChangedModel(0)} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
