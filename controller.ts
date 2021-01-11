import CaseItem from './CaseItem.ts'
import db from './db.ts'

let caseItems = db;

/**
 * @description Get all cases
 * @route GET /cases
 */
const getCaseItems = ({ response }: { response: any }) => {
  response.status = 200;
  response.body = caseItems;
};

/**
 * @description Get a case by Id
 * @route GET /cases/:id
 */
const getCaseItem = ({ params, response }: { params: { id: string }; response: any }) => {
  const caseItem: CaseItem | undefined = searchCaseItemById(params.id);
  if (caseItem) {
    response.status = 200;
    response.body = caseItem;
  } else {
    response.status = 404;
    response.body = { message: 'Case not found.' };
  }
}

/**
 * @description Add a new case
 * @route POST /cases
 */
const addCaseItem = async ({ request, response }: { request: any; response: any }) => {
  const body = await request.body();
  const caseItem: CaseItem = await body.value;
  caseItems.push(caseItem);
  response.body = { message: 'OK' };
  response.status = 200;
}

/**
 * @description Update a case by Id
 * @route PUT /cases/:id
 */
const updateCaseItem = async ({ params, request, response }: { params: { id: string }; request: any; response: any }) => {
  let caseItem: CaseItem | undefined = searchCaseItemById(params.id);
  if (caseItem) {
    const body = await request.body();
    const updateInfos: { customer?: string; product?: string; notes?: string } = await body.value;
    caseItem = { ...caseItem, ...updateInfos};
    caseItems = [...caseItems.filter(caseItem => caseItem.id !== params.id), caseItem];
    response.status = 200;
    response.body = { message: 'OK' };
  } else {
    response.status = 404;
    response.body = { message: `Case not found` };
  }
}

/**
 * @description Delete a case by id
 * @route DELETE /cases/:id
 */
const deleteCaseItem = ({ params, response }: { params: { id: string }; response: any }) => {
  caseItems = caseItems.filter(caseItem => caseItem.id !== params.id);
  response.body = { message: 'OK' };
  response.status = 200;
};

/**
 * @description return the case if found and undefined if not
 */
const searchCaseItemById = (id: string): ( CaseItem | undefined ) => caseItems.filter(caseItem => caseItem.id === id )[0];

export { getCaseItems, addCaseItem, getCaseItem, updateCaseItem, deleteCaseItem }
