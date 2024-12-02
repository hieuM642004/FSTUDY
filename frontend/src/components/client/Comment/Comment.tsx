import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Button, Popover, Input, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import HandleComment from './HandleComment';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchUserData } from '@/lib/redux/features/user/userSlice';
import { SOCKET_SERVER_URL } from '@/constant/api';
import Link from 'next/link';

import 'moment/locale/vi';

moment.locale('vi');

const { TextArea } = Input;
const ContentEdit = ({
    onRemove,
    idMySelf,
    socketRef,
    idBlog,
    idCourse,
    editContent,
}: any) => {
    const dataUser = useTypedSelector((state) => state.user);
    return (
        <div>
            <p className="cursor-pointer">
                <HandleComment
                    dataUser={dataUser}
                    idCourse={idCourse}
                    socketRef={socketRef}
                    idBlog={idBlog}
                    idMySelf={idMySelf}
                    editContent={editContent}
                />
            </p>
            <p
                className="cursor-pointer"
                onClick={() => {
                    if (confirm('Bạn có chắc chắn muốn xóa?')) {
                        onRemove();
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
    const dispatch = useAppDispatch();
    const dataUser = useTypedSelector((state) => state.user);
    const socketRef: any = useRef(null);
    useEffect(() => {
        dispatch(fetchUserData());

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
    }, [idBlog, idCourse, dispatch]);
    // handle view content
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fullContent, setFullContent] = useState('');

    const handleViewMore = (content: string) => {
        setFullContent(content);
        setIsModalOpen(true);
    };

    const truncateContent = (content: string, maxWords = 20) => {
        const words = content.split(' ');
        return words.length > maxWords
            ? `${words.slice(0, maxWords).join(' ')}...`
            : content;
    };
    // end
    const handleContentChange = (event: any | string): void => {
        setContent(event.target.value);
    };

    const handleSubmit = () => {
        if (!content) {
            alert('Bạn phải nhập nội dung trước khi gửi');
            return;
        }
        const NewDataCommnet = {
            idUser: dataUser?.id,
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
        depth = 0,
    ): React.ReactNode => {
        // return null if no replies
        if (!repliesArr || repliesArr.length === 0) {
            return null;
        }

        const result = message.filter((item1: any) => {
            return repliesArr.some((item2) => item2 === item1._id);
        });

        return (
            <>
                <div className={`w-full ${depth < 2 ? 'ml-10' : ''}`}>
                    {result.map((reply: any, index: number) => (
                        <>
                            <div className="flex mb-3 relative " key={index}>
                                <div>
                                    <Image
                                        src={
                                            reply?.idUser?.avatar ||
                                            'https://study4.com/static/img/user_icon.png'
                                        }
                                        width={30}
                                        height={30}
                                        alt="Picture of the author"
                                        className="mr-2"
                                    />
                                </div>
                                <div
                                    className={`mr-2.5 ${
                                        depth < 2 ? 'ml-3' : ''
                                    }`}
                                >
                                    {' '}
                                   
                                    <p className="font-bold text-[#355097] mr-4">
                                        {reply?.idUser?.fullname}{' '}
                                        <span className="font-normal">
                                            {moment(reply?.createdAt).format(
                                                'LLL',
                                            )}
                                        </span>
                                    </p>
                                    <p>
                                        {truncateContent(reply?.content)}{' '}
                                        {reply?.content.split(' ').length >
                                            20 && (
                                            <div
                                                className="font-bold text-[#355097] cursor-pointer"
                                                onClick={() =>
                                                    handleViewMore(
                                                        reply?.content,
                                                    )
                                                }
                                            >
                                                Xem thêm
                                            </div>
                                        )}
                                    </p>
                                    <div className="font-bold text-[#355097] cursor-pointer">
                                        <HandleComment
                                            idCourse={idCourse}
                                            parentId={reply?._id}
                                            socketRef={socketRef}
                                            idBlog={idBlog}
                                            editContent={editContent}
                                            dataUser={dataUser}
                                        />
                                    </div>
                                </div>
                                {reply?.idUser?._id === dataUser?.id && (
                                    <div className="">
                                        <Popover
                                            content={
                                                <ContentEdit
                                                    dataUser={dataUser}
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
                                                    handleEditDelete(
                                                        reply?._id,
                                                        reply?.content,
                                                    );
                                                }}
                                            >
                                                <EllipsisOutlined />
                                            </Button>
                                        </Popover>
                                    </div>
                                )}
                            </div>
                            {reply.replies && reply.replies.length > 0 && (
                                <div
                                    className={`w-full ${
                                        depth < 2 ? 'ml-10' : ''
                                    }`}
                                >
                                    {renderReplies(
                                        reply.replies,
                                        socketRef,
                                        idBlog,
                                        depth + 1,
                                    )}
                                </div>
                            )}
                        </>
                    ))}
                </div>
            </>
        );
    };

    const handleEditDelete = (id: string, contentedit: any) => {
        setIdCmt(id);
        setEditContent(contentedit);
    };

    const handleRemove = () => {
        socketRef.current.emit('deleteComment', idCmt, idBlog, idCourse);
        setCheckSubmit(!CheckSubmit);
    };

    return (
        <>
            <h3 className="font-bold text-xl mb-3">Bình Luận</h3>
            {/* Modal for displaying detail content */}
            <Modal
                title="Chi tiết bình luận"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button
                        key="close"
                        type="primary"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Đóng
                    </Button>,
                ]}
            >
                <p>{fullContent}</p>
            </Modal>
            {dataUser?.id !== null ? (
                <>
                    <div className="flex mb-4">
                        <TextArea
                            name="content"
                            rows={1}
                            className="py-[6px] pl-6 pr-3 w-[100%] border rounded-l-lg"
                            placeholder="Chia sẻ cảm nghĩ của bạn ..."
                            value={content}
                            onChange={handleContentChange}
                        ></TextArea>
                        <div className="rounded-r-xl ">
                            <button
                                onClick={handleSubmit}
                                className="bg-[#35509a] rounded-r-xl text-white py-[6px] px-3 h-full"
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Link href="/login" className="italic text-[#355097]">
                        Vui lòng đăng nhập để bình luận.
                    </Link>
                </>
            )}
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
                                                    <div className="flex mb-3 relative ">
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
                                                        <div className="mr-2.5">
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
                                                                {/*{item?.content}*/}
                                                                {truncateContent(
                                                                    item?.content,
                                                                )}{' '}
                                                                {item?.content.split(
                                                                    ' ',
                                                                ).length >
                                                                    20 && (
                                                                    <div
                                                                        className="font-bold text-[#355097] cursor-pointer"
                                                                        onClick={() =>
                                                                            handleViewMore(
                                                                                item?.content,
                                                                            )
                                                                        }
                                                                    >
                                                                        Xem thêm
                                                                    </div>
                                                                )}
                                                            </p>
                                                            <div className="font-bold text-[#355097] cursor-pointer">
                                                                <HandleComment
                                                                    dataUser={
                                                                        dataUser
                                                                    }
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
                                                                    editContent={
                                                                        editContent
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        {item?.idUser?._id ==
                                                        dataUser?.id ? (
                                                            <>
                                                                <div className="absolute right-0 top-0">
                                                                    <Popover
                                                                        content={
                                                                            <ContentEdit
                                                                                dataUser={
                                                                                    dataUser
                                                                                }
                                                                                idCourse={
                                                                                    idCourse
                                                                                }
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
                                                                                editContent={
                                                                                    editContent
                                                                                }
                                                                            />
                                                                        }
                                                                        title=""
                                                                        trigger="click"
                                                                    >
                                                                        <Button
                                                                            onClick={() => {
                                                                                handleEditDelete(
                                                                                    item?._id,
                                                                                    item?.content,
                                                                                );
                                                                            }}
                                                                        >
                                                                            <EllipsisOutlined />
                                                                        </Button>
                                                                    </Popover>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                    {item.replies &&
                                                        item.replies.length >
                                                            0 && (
                                                            <>
                                                                {renderReplies(
                                                                    item?.replies,
                                                                    socketRef,
                                                                    idBlog,
                                                                )}
                                                            </>
                                                        )}
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
