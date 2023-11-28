import { expect, test, vitest } from 'vitest'
import { actions, follow, unfollow } from './users-reducer'
import { userApi } from '../../../DAL/api/userApi'
import { BaseResponseType, ResultCodesEnum } from '../../../DAL/api/api'
import { beforeEach } from 'node:test'

vitest.mock('../../../DAL/api/userApi')
//@ts-ignore
const userAPIMock = userApi as vitest.Mocked<typeof userApi> // заглушка для userApi

// почему то с наружи тестов переменные не работают????
	//  const dispatchMock = vitest.fn() // мокавая(фейковая) функция, которая заменит настоящий dispatch
	//  const getStateMock = vitest.fn()

  // beforeEach(() => { // функция которая после каждого теста очищает стек вызовов
  //   dispatchMock.mockClear()
  //   getStateMock.mockClear()
  //   userAPIMock.getFollow.mockClear()
  //   userAPIMock.getUnFollow.mockClear()
  // })

const result: BaseResponseType = {
	// этот result пойдет вместо настоящих данных из userApi
	data: {},
	resultCode: ResultCodesEnum.Success,
	messages: [],
}


userAPIMock.getFollow.mockReturnValue(Promise.resolve(result)) // для getFollow
userAPIMock.getUnFollow.mockReturnValue(Promise.resolve(result)) // для getUnFollow
// вызываем заглушку с санкой getFollow с методам mockReturnValue для передачи фейковых данных и передаем туда промис(т.к. функция getFollow должна возвращать промис) с result с фейковыми данными

test('success follow thunk', async () => {
	const thunk = follow(1)
	const dispatchMock = vitest.fn() // мокавая(фейковая) функция, которая заменит настоящий dispatch
	const getStateMock = vitest.fn()
	await thunk(dispatchMock, getStateMock, {}) // передаем 3 параметра: dispatchMock, getStateMock и доп аргументы как пустой {}

	expect(dispatchMock).toBeCalledTimes(3) //ожидание что санка вызовет диспач определенное количества раз

	// метод по номеру вызова с определенным AC в той же последовательности что и в user-reducer в thunk _followUnfollowFlow(для санки follow)
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setDisableFetchingButton(true, 1))
	// первый раз вызывает setDisableFetchingButton(true, для user c id 1)

	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followUser(1))
	// второй раз вызывает followUser для user c id 1

	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setDisableFetchingButton(false, 1))
})// третий раз вызывает setDisableFetchingButton(false, для user c id 1)

test('success unfollow thunk', async () => {
	const thunk = unfollow(1)
	const dispatchMock = vitest.fn() // мокавая(фейковая) функция, которая заменит настоящий dispatch
	const getStateMock = vitest.fn()
	await thunk(dispatchMock, getStateMock, {}) // передаем 3 параметра: dispatchMock, getStateMock и доп аргументы как пустой {}

	expect(dispatchMock).toBeCalledTimes(3) //ожидание что санка вызовет диспач определенное количества раз

	// метод по номеру вызова с определенным AC в той же последовательности что и в user-reducer в thunk _followUnfollowFlow(для санки follow)
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setDisableFetchingButton(true, 1))
	// первый раз вызывает setDisableFetchingButton(true, для user c id 1)

	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowUser(1))
	// второй раз вызывает followUser для user c id 1

	expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setDisableFetchingButton(false, 1))
})
