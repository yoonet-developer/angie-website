import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Angie Website',

  projectId: 'ox03cu5z',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('📋 Form Submissions')
              .child(
                S.list()
                  .title('Form Submissions')
                  .items([
                    S.listItem()
                      .title('👥 Business Applications')
                      .child(
                        S.documentList()
                          .title('Business Applications')
                          .filter('_type == "businessSubmission"')
                          .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('🎓 Trainee Applications')
                      .child(
                        S.documentList()
                          .title('Trainee Applications')
                          .filter('_type == "traineeSubmission"')
                          .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('📅 Program Intakes')
              .child(
                S.documentList()
                  .title('Intakes')
                  .filter('_type == "intake"')
              ),
            S.listItem()
              .title('🛠️ Software Tools')
              .child(
                S.documentList()
                  .title('Software')
                  .filter('_type == "software"')
              ),
          ]),
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})