import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwOTM2MCwiZXhwIjoxOTU4ODg1MzYwfQ.K86iUMZzywgO7LpsFiUKksvjwjpziGRm8cTD7bd2qnM';
const SUPABASE_URL = 'https://bdsfimngsrbulrrglvgn.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function listeningMessages(addMessage) {
  return supabaseClient
    .from('messages')
    .on('INSERT', (responseLive) => {
      addMessage(responseLive.new);
    })
    .subscribe();
}

export default function ChatPage() {
    const routing = useRouter();
    const userLogged = routing.query.username;
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);

    React.useEffect(() => {
      supabaseClient
        .from('messages')
        .select('*')
        .order('id', { ascending: false })
        .then(({ data }) => {
          setMessageList(data);
        })

      const subscription = listeningMessages((newMessage) => {
        setMessageList((currentValueList) => {
          return [
            newMessage,
            ...currentValueList,
          ]
        });
      });
    
      return () => {
        subscription.unsubscribe();
      }
    }, []);

    function handleNewMessage(newMessage) {
        const message = {
            from: userLogged,
            text: newMessage,
        };

        supabaseClient
          .from('messages')
          .insert([
            message
          ])
          .then(({ data }) => {
            console.log('Criando mensagem: ', data);
          });
    
        setMessage('');
    }

    function deleteMessage(currentMessage) {
      supabaseClient
        .from('messages')
        .delete()
        .match({id: currentMessage.id})
        .then(({data}) => {
          const messagesListFiltered = messageList.filter((message) => {
            return message.id != data[0].id
          });
          setMessageList(messagesListFiltered);
        });
    }

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors['purple-one'],
        backgroundImage: `url(/background-friends.png)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors['white']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors['purple-one'],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors['purple-two'],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessageList mensagens={messageList} deleteMessage={deleteMessage}/>
          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            
            <TextField
              value={message}
              onChange={(event) => {
                const valor = event.target.value;
                setMessage(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleNewMessage(message);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors['purple-one'],
                marginRight: '12px',
                color: appConfig.theme.colors['white'],
                placeholder: {
                  color: appConfig.theme.colors['white'],
                }
              }}
            />
            <ButtonSendSticker 
              onStickerClick={(sticker) => {
                handleNewMessage(':sticker:' + sticker);
              }}
            />
            <Button 
                label={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>}
                styleSheet={{
                  borderRadius: '5px',
                  backgroundColor: appConfig.theme.colors['purple-one'],
                  minWidth: '50px',
                  minHeight: '50px',
                  marginLeft: '8px',
                  fontSize: '20px',
                  marginBottom: '8px',
                  lineHeight: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                variant='tertiary'
                colorVariant='dark'
                buttonColors={{
                  mainColor: appConfig.theme.colors['white'],
                }}
                onClick={(event) => {
                  event.preventDefault()
                  deleteMessage(message)
                }}
							onClick={e => handleNewMessage(message)}
						/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Image src="/friends-Logo.png" 
          styleSheet={{
            width: '150px',
            height: '75px'
          }}
        />
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
          styleSheet={{
            color: appConfig.theme.colors['white'],
            hover: {
              backgroundColor: appConfig.theme.colors['purple-two']
            }
          }}
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  const deleteMessage = props.deleteMessage;

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors['purple-one'],
        marginBottom: '16px',
        overflow: 'auto',
      }}
    >
      
      {props.mensagens.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              color: appConfig.theme.colors['white'],
              hover: {
                backgroundColor: appConfig.theme.colors['purple-one'],
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text tag="strong">
                {message.from}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors['white'],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text>
              <Button 
                styleSheet={{
                  borderRadius: '25%',
                  width: '12px',
                  marginLeft: '8px'
                }}
                variant='tertiary'
                colorVariant='dark'
                label={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>}
                buttonColors={{
                  mainColor: appConfig.theme.colors['white'],
                }}
                onClick={(event) => {
                  event.preventDefault()
                  deleteMessage(message)
                }}
              />
            </Box>
            {message.text.startsWith(':sticker:') ? <Image src={message.text.replace(':sticker:', '')}/> : message.text}
          </Text>
        );
      })}
    </Box>
  )
}