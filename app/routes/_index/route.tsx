import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  Form,
  useActionData,
  useLoaderData,
} from '@remix-run/react'
import { clsx } from 'clsx'
import { atom, useAtom } from 'jotai'
import { z } from 'zod'
import { colors, useTodoListStore } from '~/stores/todoList'
import deleteIcon from './deleteIcon.svg'
import plusIcon from './plusIcon.svg'

const colorAtom = atom<(typeof colors)[number]>(colors[0])

export const clientLoader = async ({
  request,
  params,
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  return { todoList: Object.values(useTodoListStore.getState().todoList) }
}

const schema = z.discriminatedUnion('intent', [
  z.object({
    title: z.string().min(1),
    color: z.enum(colors),
    intent: z.literal('addTodo'),
  }),
  z.object({
    intent: z.literal('toggleTodo'),
    id: z.number(),
  }),
  z.object({
    id: z.number(),
    intent: z.literal('removeTodo'),
  }),
])

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema })

  // Send the submission back to the client if the status is not successful
  if (submission.status !== 'success') {
    console.log(submission.error)
    return submission.reply()
  }

  const { intent } = submission.value

  if (intent === 'addTodo') {
    const { addTodo } = useTodoListStore.getState()
    addTodo({ ...submission.value })
    return submission.reply({ resetForm: true })
  }

  if (intent === 'removeTodo') {
    const { removeTodo } = useTodoListStore.getState()
    removeTodo({ id: submission.value.id })
    return submission.reply({ resetForm: true })
  }

  if (intent === 'toggleTodo') {
    const { toggleTodo } = useTodoListStore.getState()
    toggleTodo({ id: submission.value.id })
    return
  }

  return intent satisfies never
}

export default function Index() {
  const [color, setColor] = useAtom(colorAtom)
  const { todoList } = useLoaderData<typeof clientLoader>()
  const lastResult = useActionData<typeof clientAction>()
  const [form, fields] = useForm({
    shouldValidate: 'onBlur',
    // Optional: Required only if you're validating on the server
    lastResult,
    // Optional: Client validation. Fallback to server validation if not provided
    onValidate({ formData }) {
      const submission = parseWithZod(formData, { schema })
      if (submission.status !== 'success') {
        console.log(submission.error)
      }
      return submission
    },
    constraint: getZodConstraint(schema),
  })

  return (
    <div className='min-h-screen pb-6'>
      <div className='h-screen max-h-[25vh]'></div>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <div className='flex flex-wrap gap-x-4 gap-y-2'>
          <h1 className='text-[4rem] font-bold leading-none text-[#222]'>
            Do it Now
          </h1>

          <section className='ml-auto flex justify-center gap-x-2 rounded-btn bg-white px-4 py-6'>
            {colors.map((color) => (
              <button
                key={color}
                className='btn btn-circle btn-sm'
                style={{ backgroundColor: color }}
                onClick={() => setColor(color)}
              >
                <span className='sr-only'>Use color {color}</span>
              </button>
            ))}
          </section>
        </div>

        <section className='mt-6'>
          <Form
            {...getFormProps(form)}
            method='POST'
            className='relative flex h-20 items-center rounded-btn bg-white'
          >
            <input
              placeholder='Add a new to-do item'
              className='input input-bordered h-full w-full grow rounded-r-none border-none pr-20'
              {...getInputProps(fields.title, { type: 'text' })}
            />
            <div className='absolute right-24'>
              <div
                className='size-11 rounded-full transition-colors'
                style={{ backgroundColor: color }}
              ></div>
              <input type='hidden' name='color' value={color} />
            </div>
            <button
              className='btn btn-square size-20 rounded-l-none border-none bg-purple-600 hover:bg-purple-700'
              type='submit'
              name='intent'
              value='addTodo'
            >
              <span className='sr-only'>Add a new to-do item</span>
              <img src={plusIcon} width={24} height={24} alt='' />
            </button>
          </Form>
        </section>

        <section className='mt-6'>
          <ul className='flex flex-col gap-y-4'>
            {todoList.map((todo) => (
              <li key={todo.id}>
                <Form
                  method='POST'
                  className='flex items-center justify-between gap-x-3 rounded-btn p-4'
                  style={{ backgroundColor: todo.color }}
                >
                  <input type='hidden' name='id' value={todo.id} />
                  <input
                    type='checkbox'
                    checked={todo.completed}
                    className='checkbox rounded-full bg-white'
                  />
                  <p
                    className={clsx(
                      'grow truncate text-lg font-medium text-white',
                      todo.completed && 'line-through',
                    )}
                  >
                    {todo.title}
                  </p>

                  <button
                    className='btn btn-square btn-ghost'
                    type='submit'
                    name='intent'
                    value='removeTodo'
                  >
                    <img src={deleteIcon} width={50} height={50} alt='' />
                    <span className='sr-only'>Delete this Todo</span>
                  </button>
                </Form>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
