import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Button, Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import HandleComment from './HandleComment';

const SOCKET_SERVER_URL = 'http://localhost:3002';

moment.locale('vi');
const ContentEdit = ({ onRemove, idMySelf, socketRef, idBlog  , idCourse , editContent}: any) => {
    return (
        <div>
            <p className="cursor-pointer">
                <HandleComment
                    idCourse={idCourse}
                    socketRef={socketRef}
                    idBlog={idBlog}
                    idMySelf={idMySelf}
                    editContent={editContent}
                />
            </p>
            <p className="cursor-pointer"
           
             onClick={() => {
                if (confirm('Bạn có chắc chắn muốn xóa?')) {
                    onRemove()
                } else {
                    //    hủy
                }
            }}
            >
                Xóa
            </p>
        </div>
    );
};
function Comment({ idBlog = null, idCourse = null }: string | any) {
    const [message, setMessage] = useState([]);
    const [content, setContent] = useState('');
    const [idCmt, setIdCmt] = useState('');
    const [CheckSubmit, setCheckSubmit] = useState(false);
    const [editContent, setEditContent] = useState();
    
    const socketRef: any = useRef(null);
    useEffect(() => {
        // Connect to Socket.IO server
        socketRef.current = io(SOCKET_SERVER_URL);

        // Listen for events from the server
        socketRef.current.timeout(3000).on('comments', (data: any) => {
            setMessage(data);
        });
        socketRef.current.emit('joinRoom', { idBlog, idCourse });

        // Send request to server
        socketRef.current.emit('requestComments', { idBlog, idCourse });
        // Disconnect when component is unmounted
        return () => {
            socketRef.current.disconnect();
        };
    }, [idBlog, idCourse]);

    const handleContentChange = (event: any | string): void => {
        setContent(event.target.value);
    };

    const handleSubmit = () => {
        if(!content){
            alert('Bạn phải nhập nội dung trước khi gửi');
            return ;
        }
        const NewDataCommnet = {
            idUser: '6673c0f300582bda3b1e96a0', // id user 
            idBlog: idBlog || null,
            idCourse: idCourse || null,
            parentId: null,
            content: content,
        };
        socketRef.current.emit('newComment', NewDataCommnet);

        setContent('');
    };

    const renderReplies = (
        repliesArr: any[],
        socketRef: any,
        idBlog: any,
    ): React.ReactNode => {
        if (!repliesArr || repliesArr.length === 0) {
            return null;
        }
        const result = message.filter((item1:any, index) => {
            return repliesArr.some((item2) => item2 === item1._id);
        });

        return (
            <>
                {result.map((reply: any, index: number) => (
                    <div className="flex mb-3 ml-10 relative" key={index}>
                        <div>
                            <Image
                                src={
                                    reply?.idUser?.avatar
                                        ? reply?.idUser?.avatar
                                        : 'https://study4.com/static/img/user_icon.png'
                                }
                                width={30}
                                height={30}
                                alt="Picture of the author"
                                className="mr-2"
                            />
                        </div>
                        <div>
                            <p className="font-bold text-[#355097] mr-4">
                                {reply?.idUser?.fullname}{' '}
                                <span className="font-normal">
                                    {moment(reply?.createdAt).format('LLL')}
                                </span>
                            </p>
                            <p>{reply?.content}</p>
                            <span className="font-bold text-[#355097] cursor-pointer">
                                <HandleComment
                                    idCourse={idCourse}
                                    parentId={reply?._id}
                                    socketRef={socketRef}
                                    idBlog={idBlog}
                                    editContent={editContent}
                                />
                            </span>
                            {/* Recursive call to render child replies */}
                            {reply.replies && reply.replies.length > 0 && (
                                <div className="ml-10 w-full">
                                    {renderReplies(
                                        reply.replies,
                                        socketRef,
                                        idBlog,
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="absolute right-0 top-0">
                            <Popover
                                content={
                                    <ContentEdit
                                        idCourse={idCourse}
                                        onRemove={handleRemove}
                                        idMySelf={idCmt}
                                        socketRef={socketRef}
                                        idBlog={idBlog}
                                        editContent={editContent}
                                    />
                                }
                                title=""
                                trigger="click"
                            >
                                <Button
                                    onClick={() => {
                                        handleEditDelete(reply?._id , reply?.content);
                                    }}
                                >
                                    <EllipsisOutlined />
                                </Button>
                            </Popover>
                        </div>
                    </div>
                ))}
            </>
        );
    };

    const handleEditDelete = (id: string , contentedit : any) => {
        setIdCmt(id);
        setEditContent(contentedit)
    };

    const handleRemove = () => {
        socketRef.current.emit('deleteComment', idCmt , idBlog, idCourse);
        setCheckSubmit(!CheckSubmit);
    };
    
    return (
        <>
            <h3 className="font-bold text-xl mb-3">Bình Luận</h3>
            <div className="flex mb-4">
                <textarea
                    name="content"
                    rows={1}
                    className="py-[6px] pl-6 pr-3 w-[100%] border rounded-l-xl"
                    placeholder="Chia sẻ cảm nghĩ của bạn ..."
                    value={content}
                    onChange={handleContentChange}
                ></textarea>
                <div className="rounded-r-xl">
                    <button
                        onClick={handleSubmit}
                        className="bg-[#35509a] rounded-r-xl text-white py-[6px] px-3 h-full"
                    >
                        Gửi
                    </button>
                </div>
            </div>
            {/*  comment post */}
            <div className="mt-2">
                {/* comment now */}
                <div>
                    <div>
                        {message.length !== 0 ? (
                            <div>
                                {message.length !== 0 &&
                                    Array.isArray(message) &&
                                    message.map((item: any, index) => {
                                        
                                        if (item.parentId === null) {
                                            return (
                                                <div key={index}>
                                                    <div className="flex mb-3 relative">
                                                        <div>
                                                            <Image
                                                                src={
                                                                    item?.idUser
                                                                        ?.avatar
                                                                        ? item
                                                                              ?.idUser
                                                                              ?.avatar
                                                                        : 'https://study4.com/static/img/user_icon.png'
                                                                }
                                                                width={30}
                                                                height={30}
                                                                alt="Picture of the author"
                                                                className="mr-2"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-[#355097] mr-4">
                                                                {
                                                                    item?.idUser
                                                                        ?.fullname
                                                                }{' '}
                                                                <span className="font-normal">
                                                                    {moment(
                                                                        item?.createdAt,
                                                                    ).format(
                                                                        'LLL',
                                                                    )}
                                                                </span>
                                                            </p>
                                                            <p>
                                                                {item?.content}
                                                            </p>
                                                            <span className="font-bold text-[#355097] cursor-pointer">
                                                                <HandleComment
                                                                    idCourse={
                                                                        idCourse
                                                                    }
                                                                    parentId={
                                                                        item?._id
                                                                    }
                                                                    socketRef={
                                                                        socketRef
                                                                    }
                                                                    idBlog={
                                                                        idBlog
                                                                    }
                                                                    editContent={editContent}
                                                                />
                                                            </span>
                                                            {item.replies &&
                                                                item.replies
                                                                    .length >
                                                                    0 && (
                                                                    <div className="ml-10 w-full">
                                                                        {renderReplies(
                                                                            item.replies,
                                                                            socketRef,
                                                                            idBlog,
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>

                                                        <div className="absolute right-0 top-0">
                                                            <Popover
                                                                content={
                                                                    <ContentEdit
                                                                        idCourse={idCourse}
                                                                        onRemove={
                                                                            handleRemove
                                                                        }
                                                                        idMySelf={
                                                                            idCmt
                                                                        }
                                                                        socketRef={
                                                                            socketRef
                                                                        }
                                                                        idBlog={
                                                                            idBlog
                                                                        }
                                                                        editContent={editContent}
                                                                    />
                                                                }
                                                                title=""
                                                                trigger="click"
                                                            >
                                                                <Button
                                                                    onClick={() => {
                                                                        handleEditDelete(
                                                                            item?._id,
                                                                            item?.content
                                                                        );
                                                                    }}
                                                                >
                                                                    <EllipsisOutlined />
                                                                </Button>
                                                            </Popover>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                            </div>
                        ) : (
                            <>
                                <p className="italic text-[#355097]">
                                    Chưa có bình luận nào. Hãy trở thành người
                                    đầu tiên bình luận bài này.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comment;
