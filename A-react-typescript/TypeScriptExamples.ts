// =========== Generics ==========================

type UserType = {
	firstName: string
	lastName: string
	age: number
}

type PhotoType = {
	large: string
	small: string
}
// Generic, вместо D просто подставляем нужный нам тип
type ServerResponseType<D> = {
	errorCode: number
	message: Array<string> // это тоже generic
	data: D //впоследствии вместо D просто подставляем нужный нам тип
}

const response1: ServerResponseType<UserType> = {
	// вместо D просто подставляем нужный нам тип
	errorCode: 1,
	message: ['it`s', 'response'],
	data: {
		firstName: 'Jacob',
		lastName: 'Zabolotnyi',
		age: 33,
	},
}

const response2: ServerResponseType<PhotoType> = {
	// вместо D просто подставляем нужный нам тип
	errorCode: 1,
	message: ['it`s', 'response'],
	data: {
		large: 'https://bla bla....',
		small: 'https://bla bla....',
	},
}
//============ Определение типов ==================

// const initial = {
// 	age: 33,
// 	name: 'Jacob',
// 	user: null as UserType | null,
// 	photo: null as PhotoType | null,
// }

// создаем generic что бы не писать каждый раз '... | null'

type Nullable<T> = null | T // вместо T просто подставляем нужный нам тип

const initial = {
	age: 33,
	name: 'Jacob',
	user: null as Nullable<UserType>, // вместо T просто подставляем нужный нам тип
	photo: null as Nullable<PhotoType>, // вместо T просто подставляем нужный нам тип
}

// type StateType = typeof initial // это тайпскриптовый typeof который определяет типы по объявленным значениям( в данном случае из объекта 'initial')

// const reducer = (state: StateType = initial, action: any) => {
// 	state.photo = {
// 		large: '',
// 		small: '',
// 	}

//   return state
// }

//--------- ReturnType ------------------------------------------

// const AC1 = (age: number) => ({type: 'SET-AGE', age} as const) // 'as const' не даст присвоить никаких других значении кроме как объявленных
// const AC2 = (firstName: string, lastName: string) => ({type: 'SET-NAME', firstName, lastName} as const)// 'as const' не даст присвоить никаких других значении кроме как объявленных

// type AC1Type = ReturnType<typeof AC1> // определяет типы по объявленным значениям в AC1
// type AC2Type = ReturnType<typeof AC2>// определяет типы по объявленным значениям в AC2

// const action1: AC1Type = {type: 'SET-AGE', age: 33 }

//--------------------------
//вместо объявления отдельных типов, они переносятся в ActionsTypes
// type StateType = typeof initial

// type ActionsTypes = ReturnType<typeof AC1> | ReturnType<typeof AC2>

// const reducer = (state: StateType = initial, action: ActionsTypes) => {
// 	//присваиваем ActionsTypes для action
// 	switch (action.type) {
// 		case 'SET-AGE':
// 			return { ...state, age: action.age }
// 		case 'SET-NAME':
// 			return { ...state, name: action.firstName + ' ' + action.lastName }
// 	}

// 	return state
// }

// const AC1 = (age: number) => ({ type: 'SET-AGE', age } as const) // 'as const' не даст присвоить никаких других значении кроме как объявленных
// const AC2 = (firstName: string, lastName: string) => ({ type: 'SET-NAME', firstName, lastName } as const) // 'as const' не даст присвоить никаких других значении кроме как объявленных

//========== Conditional Types ============

//присваивает типы по условию
type HipHop<T> = T extends 'user' ? UserType : T extends 'photo' ? PhotoType : number

let a: HipHop<'user'> = {
	firstName: 'Jacob',
	lastName: 'Zabolotnyi',
	age: 33,
}

let b: HipHop<'photo'> = {
	large: '',
	small: '',
}

//так же можно условие передать и в определение самого объекта:
// теперь 'c' может быть как 'user'
let c: HipHop<'user' | 'photo'> = {
	firstName: 'Jacob',
	lastName: 'Zabolotnyi',
	age: 33,
}
// так и 'photo'
c = {
	large: '',
	small: '',
} //----------------------------------
// пишем свой кастомный ReturnType по условиям:

//(пояснения) MyReturnType - это generic, который принимает тип функции, и если этот тип функции наследуется именно от функции, которая принимает любое кол-во аргументов((...arg: any[])) и возвращает какой то другой тип, то тогда проанализируй(определи) этот тип(infer), запомни и запиши его в переменную(R) и если 'T' действительно является функцией, то тогда верни этот R, если нет то верни any или never:
// type MyReturnType<T> = T extends (...arg: any[]) => infer R ? R : never

// кастомный MyReturnType:
// type ActionsTypes = MyReturnType<typeof AC1> | MyReturnType<typeof AC2>

// пример с объектом:
const obj = {
	a: { name: 'Jacob' },
	b: { age: 33 },
	c: { site: { title: 'Perekrestok' } },
}

// type SomeType = typeof obj.a | typeof obj.b | typeof obj.c

// let person: SomeType = {
// 	name: 'jjnjbnj',
// 	age: 33,
// 	site: { title: 'kjkjkj' },
// }

//опять вместо того что выше пишем кастомный ReturnType

type SomeType<T> = T extends { [key: string]: infer U } ? U : never

// типы определятся автоматически
let person: SomeType<typeof obj> = {
	// передаем в gineric объект 'obj', по которому будут определены типы
	name: 'jjnjbnj',
	age: 33,
	site: { title: 'kjkjkj' },
}

// пример для Action Creators по той же аналогии что и выше:

type StateType = typeof initial

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

// type ActionsTypes = ReturnType<PropertiesTypes<typeof actions>>
type ActionsTypes = GetActionsTypes<typeof actions> // передаем шаблон GetActionsTypes с типами по AC

//шаблон для ReturnType<PropertiesTypes<typeof actions>>:
type GetActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>> //в типе GetActionsTypes нужно указать ограничение\constraint для передаваемого T, указав, что это ОБЯЗАТЕЛЬНО должен быть объект, у которого в качестве значения св-ва обязательно функция, принимающая что-нибудь и возвращаемая что-нибудь

const reducer = (state: StateType = initial, action: ActionsTypes) => {
	//присваиваем ActionsTypes для action
	switch (action.type) {
		case 'SET-AGE':
			return { ...state, age: action.age }
		case 'SET-NAME':
			return { ...state, name: action.firstName + ' ' + action.lastName }
	}

	return state
}

// при определении чего либо с типом этих AC, TS будет подсказывать что должно быть в том или ином типе
// например:
let something: GetActionsTypes<typeof actions> = { type: 'SET-AGE', age: 33 }// передаем шаблон GetActionsTypes с типами по AC


// создаем объект с нашими AC:
const actions = {
	AC1: (age: number) => ({ type: 'SET-AGE', age } as const),
	AC2: (firstName: string, lastName: string) => ({ type: 'SET-NAME', firstName, lastName } as const),
}
