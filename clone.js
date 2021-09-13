import fetch from 'node-fetch';

const cloneTemplate = async (sourceToken, destToken, templateId) => {
  const getOtwResponse = await fetch(`https://app.ontask.io/api/v2/workflowTemplates/${templateId}`, {
    headers: {
      Authorization: sourceToken
    }
  });

  const createTemplateResponse = await fetch('https://app.ontask.io/api/v2/workflowTemplates', {
    body: JSON.stringify({}),
    headers: {
      Authorization: destToken,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
  const { templateId: clonedTemplateId } = await createTemplateResponse.json();

  await fetch(`https://app.ontask.io/api/v2/workflowTemplates/${clonedTemplateId}?publish=true`, {
    body: getOtwResponse.body,
    headers: {
      Authorization: destToken, 
      'Content-Type': 'application/ontask'
    },
    method: 'PUT'
  });

  return { dest: clonedTemplateId, source: templateId };
};

const cloneAllTemplates = async (sourceToken, destToken) => {
  const response = await fetch('https://app.ontask.io/api/v2/workflowTemplates', {
    headers: {
      Authorization: sourceToken
    }
  });
  const sourceTemplates = await response.json();
  const results = await Promise.all(sourceTemplates.map(({ templateId }) => cloneTemplate(sourceToken, destToken, templateId)));
  return results;
};

const [ sourceToken, destToken ] = process.argv.slice(2);

if (!sourceToken || !destToken) {
  console.error('Usage: node clone :sourceToken :destToken');
  process.exit(1);
}

(async () => {
  const results = await cloneAllTemplates(sourceToken, destToken);
  results.forEach(({ dest, source }) => {
    console.log(`Cloned template ${source} to ${dest}`);
  });
})();
