import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getCaseItems, addCaseItem, getCaseItem, updateCaseItem, deleteCaseItem } from './controller.ts';

const router = new Router();

router
.get('/cases', getCaseItems)
.post('/cases', addCaseItem)
.get('/cases/:id', getCaseItem)
.put('/cases/:id', updateCaseItem)
.delete('/cases/:id', deleteCaseItem);

export default router
