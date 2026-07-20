import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://gkqcjyoekhavxalxnbes.supabase.co';
const supabaseKey = 'sb_publishable_ltt2HcP6t1vsBlEUAhUgvA_7YQBt_aV';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getUsuario() {
    const { data: usuario, error } = await supabase.from('Usuario').select('*');
    if (error) console.error('Erro ao buscar usuario:', error);
    return usuario;
}