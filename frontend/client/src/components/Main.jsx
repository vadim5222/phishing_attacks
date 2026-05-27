import { useForm } from 'react-hook-form'

const Main = () => {

    const { register, handleSubmit } = useForm('')

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <main className="container mx-auto max-w-screen-xl">
            <section className="mb-32">
                <div className="flex items-center mb-20 gap-7">
                    <div>
                        <h1 className="text-white text-3xl  mb-5">Передовая кибербезопасность для любой компании </h1>
                        <p className="text-gray-300 text-2xl mb-4">Защитите ваш бизнес от всех видов киберугроз с помощью решений мирового класса. </p>
                        <button className="px-20 py-3 bg-cyan-800/45 rounded-xl text-white">Подробнее</button>
                    </div>
                    <img src='/hero_1.png' className="w-full" />
                </div>
                <div className="flex justify-between items-center gap-8">
                    <img src="/hero_2.webp" className="w-full rounded-xl" />
                    <div>
                        <h1 className="text-white text-3xl  mb-5">Кибербезопасность нового поколения</h1>
                        <p className="text-gray-300 text-2xl mb-4">Масштабируемая защита от самых сложных киберугроз, учитывающая потребности вашего бизнеса. </p>
                    </div>
                </div>
            </section>

            <section className="mb-20">
                <div className="block items-center justify-center">
                    <h1 className="text-center text-white text-3xl mb-8"> Инструменты</h1>
                    <p className="text-center text-white font-thin text-3xl w-5/6 flex mx-auto ">Тестирование на проникновение позволяет ответить на вопрос, как кто-то со злым умыслом может вмешаться в вашу сеть.</p>
                </div>
            </section>


            <section className="mb-20">
                <h1 className="text-center text-white text-3xl mb-8" >Наши продукты направлены на вашу безопасность. </h1>
                <p className="text-center text-white font-thin text-3xl w-5/6 flex mx-auto mb-12">Мы придерживаемся в своей работе простого принципа: детектировать и блокировать любую вредоносную атаку.</p>
                <div className="flex items-center gap-10">
                    <div className="w-full p-8 bg-cyan-950/45 rounded-xl">
                        <img src="/Icon_01.png" className="flex mx-auto" />
                        <p className="text-center">Анонимность</p>
                    </div>
                    <div className="w-full p-8 bg-cyan-950/45 rounded-xl">
                        <img src="/Icon_check.png" className="flex mx-auto" />
                        <p className="text-center">Проверка на наличие угроз</p>
                    </div>
                    <div className="w-full p-8 bg-cyan-950/45 rounded-xl">
                        <img src="/Protect_icon.png" className="flex mx-auto" />
                        <p className="text-center">Обнаружение и предотвращение атак</p>
                    </div>
                </div>
            </section>

            <section className="mb-20">
                <h1 className="text-center text-white text-3xl mb-8">Вы можете связаться с нами удобным для Вас способом</h1>
                <div className='flex  justify-between bg-cyan-950/45 p-10 rounded-xl items-baseline'>
                    <div>
                        <form className="p-4 md:p-6 lg:p-8 w-full rounded-xl" onSubmit={handleSubmit(onSubmit)}>
                            <input className=' w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' placeholder='Как к вам обращаться?' type="text" {...register('username')} />
                            <input className=' w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' placeholder='Какую компанию вы представляете' type="text" {...register('company')} />
                            <input className=' w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' placeholder='Адрес электронной почты' type="email" {...register('email')} />
                            <textarea className='w-full h-64 mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' placeholder='Введите ваше сообщение'/>
                            <button className='w-1/2 my-5 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' type='submit'>Отправить данные</button>
                        </form>
                    </div>
                    <div>
                        <div className='flex items-center  mb-2 gap-4'>
                            <img src="/location.png" />
                            <p className='text-left '>Ленинградский пр-т., 27, к2</p>
                        </div>
                        <div className='flex items-center  mb-2 gap-4'>
                            <img src="/phone.png" />
                            <p>+7 (495) 000 - 00 - 00</p>
                        </div>
                        <div className='flex items-center mb-2 gap-4'>
                            <img src="/email.png" />
                            <p>admin@trustcrypt.com</p>
                        </div>
                        <iframe className='rounded-xl ' src="https://yandex.ru/map-widget/v1/?um=constructor%3A7c8d9bb41b8a5cc5ecd08d7ff663bf5344b0f7deaf65464a777bdea1290fa9b4&amp;source=constructor" width="500" height="400" frameborder="0"></iframe>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Main